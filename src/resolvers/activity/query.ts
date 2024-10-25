import { QueryResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { RoleStatus } from "../../config/common/status.ts";
import { ActivityLog } from "../../models/activityLogs.ts";

export const activityQueries: QueryResolvers = {
    activityLogList: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${args},\n 
                context: ${context},\n 
                info ${info}\n    
            `);
            const { filters = {}, first = 10, after = 0 } = args;
            const activityLogData = await ActivityLog.aggregate([
                {
                    $match: {
                        ...filters,
                        status: RoleStatus.Active
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $skip: after,
                },
                {
                    $limit: first + 1,
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "track.product",
                        foreignField: "uuid",
                        as: "products",
                    },
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "track.toLocation",
                        foreignField: "uuid",
                        as: "toLocations",
                    },
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "track.fromLocation",
                        foreignField: "uuid",
                        as: "fromLocation",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "uuid",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'reasonlogs',
                        localField: 'activityReason',
                        foreignField: 'uuid',
                        as: 'reasonLog'
                    }
                },
                {
                    $unwind: {
                        path: '$reasonLog',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        uuid: 1,
                        track: 1,
                        activityId: 1,
                        activityReason: '$reasonLog.name',
                        description: 1,
                        name: 1,
                        type: 1,
                        note: 1,
                        status: 1,
                        deleted: 1,
                        deletedAt: 1,
                        deletedBy: 1,
                        deletedReason: 1,
                        deletedNote: 1,
                        createdAt: 1,
                        createdBy: "$user.email",
                        updatedAt: 1,
                        updatedBy: 1,
                    },
                }
            ]);
            const hasNextPage = activityLogData.length > first;
            const activityLogDataList = hasNextPage
                ? activityLogData.slice(0, -1)
                : activityLogData;
            const response = {
                activityLogs: [...activityLogDataList],
                hasMore: hasNextPage,
            };

            return response;
        } catch (error) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    activityLog: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${args},\n 
                context: ${context},\n 
                info ${info}\n    
            `);
            const [activityLogData] = await ActivityLog.aggregate([
                {
                    $match: {
                        uuid: args?.uuid,
                    },
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "track.product",
                        foreignField: "uuid",
                        as: "products",
                    },
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "track.toLocation",
                        foreignField: "uuid",
                        as: "toLocations",
                    },
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "track.fromLocation",
                        foreignField: "uuid",
                        as: "fromLocation",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "uuid",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'reasonlogs',
                        localField: 'activityReason',
                        foreignField: 'uuid',
                        as: 'reasonLog'
                    }
                },
                {
                    $unwind: {
                        path: '$reasonLog',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        uuid: 1,
                        track: 1,
                        activityId: 1,
                        activityReason: '$reasonLog.name',
                        description: 1,
                        name: 1,
                        type: 1,
                        note: 1,
                        status: 1,
                        deleted: 1,
                        deletedAt: 1,
                        deletedBy: 1,
                        deletedReason: 1,
                        deletedNote: 1,
                        createdAt: 1,
                        createdBy: "$user.email",
                        updatedAt: 1,
                        updatedBy: 1,
                    },
                }
            ]);

            return activityLogData;
        } catch (error) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
}