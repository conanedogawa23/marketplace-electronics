import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { MutationResolvers } from "../../generated/graphql.ts";
import { ActivityLog, ActivityLogDocument } from "../../models/activityLogs.ts";
import { ActivityLogType } from '../../config/common/status.ts';
import { 
    changeProjectProductAllocate, 
    associateProjectWithSerializedProduct, 
    updateProductUsedWithAllocate,
    updateLocationProductDataWithAllocate
} from "../../service/product.service.ts";

export const activityMutations: MutationResolvers = {
    createActivityLog: async (parent, args, context, info) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${args},\n ,
                context: ${context},\n 
                info: ${info}\n
            `);
    
            const { activity } = args;
    
            const activityPayload = new ActivityLog({
                createdBy: context?.user?.uuid,
                updatedBy: context?.user?.uuid,
                status: activity?.status || 'active',
                type: activity?.type || ActivityLogType.ALLOCATE_STOCK,
                note: activity?.note,
                track: activity?.track,
                warehouse: activity?.warehouse,
                activityId: activity?.activityId,
                description: activity?.description,
                name: activity?.name,
                project: activity?.project,
            });
    
    
            const newActivity = await activityPayload.save();
            const allocatedDataArray = await changeProjectProductAllocate(activity?.track as any);
            await associateProjectWithSerializedProduct(activity?.type as string, activity?.project as string, activity?.track as any);
            await updateProductUsedWithAllocate(activity?.track as any, allocatedDataArray as any);
            await updateLocationProductDataWithAllocate(activity?.track as any);
            return newActivity.toObject();
            
        } catch (error: any) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST + error?.message, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    updateActivityLog: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        
        const { activity } = args;
        
        const updatedActivity = await ActivityLog.findOneAndUpdate({ 
            uuid: activity?.uuid 
        }, {
            updatedBy: context?.user?.uuid,
        }, { upsert: true }) as unknown as ActivityLogDocument;

        return updatedActivity.toObject();
    }
}