import { GraphQLError } from "graphql";
import { QueryResolvers } from "../../generated/graphql.ts";
import { User, UserSchema } from '../../models/user.ts';
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getAllAttachmentsRelatedToUser } from "../../service/user.service.ts";
import { transformFilterFields } from "../../utils/index.ts";


export const userResolvers: QueryResolvers = {
    userList: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { filter, textSearchFilters } = args;
        let searchConditions = {}
        if (filter || textSearchFilters) {
            searchConditions = transformFilterFields(filter, textSearchFilters);
        }
        let { first } = args
        if (!first || first < 1) {
            first = 10;
        }
        let { after } = args
        if (!after || after < 0) {
            after = 0;
        }


        const userList = await User.aggregate([
            {
                $match: searchConditions
            },
            {
                $lookup: {
                    from: 'departments',
                    localField: 'department',
                    foreignField: 'uuid',
                    as: 'department'
                }
            },
            {
                $unwind: {
                    path: '$department',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'role',
                    foreignField: 'uuid',
                    as: 'role'
                }
            },
            {
                $lookup: {
                    from: 'permissions',
                    localField: 'permissions',
                    foreignField: 'uuid',
                    as: 'permissions'
                }
            },
            {
                $lookup: {
                    from: 'projects',
                    localField: 'projects',
                    foreignField: 'uuid',
                    as: 'projects'
                }
            },
            {
                $unwind: {
                    path: '$role',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $sort: {
                    createdAt: 1
                }
            },
            {
                $skip: after
            },
            {
                $limit: first + 1
            }
        ]);
        const hasNextPage = userList.length > first;
        const edges = hasNextPage ? userList.slice(0, -1) : userList;

        if (userList.length > 0) {
            const images = userList.map(user => user.image);
            if (images.length > 0) {
                const imageUrls = await getAllAttachmentsRelatedToUser(images);
                for (let i = 0; i < userList.length; i++) {
                    userList[i].image = imageUrls[i];
                }
            }
        }
        return {
            users: edges,
            hasMore: hasNextPage
        };
    },
    user: async (parent, args: any, context, info) => {
        console.log(`
            parent: ${JSON.stringify(parent)},\n 
            args: ${JSON.stringify(args)},\n 
            context: ${JSON.stringify(context)},\n 
            info ${JSON.stringify(info)}\n 
        `)
        if (!args?._id) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        const userDetails = await User.findById(args?._id).lean() as unknown as UserSchema;
        if (userDetails?.image) {
            const imageUrls = await getAllAttachmentsRelatedToUser([userDetails.image]);
            userDetails.image = imageUrls[0];
        }
        return {
            ...userDetails,
            createdAt: userDetails?.createdAt?.toISOString(),
            updatedAt: userDetails?.updatedAt?.toISOString(),
            deletedAt: userDetails?.deletedAt?.toISOString(),
            dateOfBirth: userDetails?.dateOfBirth?.toISOString(),
            hireDate: userDetails?.hireDate?.toISOString(),
        };
    }
}