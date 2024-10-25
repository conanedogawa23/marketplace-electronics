import { Inventory } from "../../models/inventory.ts";
import { QueryResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { transformFilterFields } from "../../utils/index.ts";

export const inventoryQueries: QueryResolvers = {
    inventoryList: async (parent, args: any, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `)
        const { filters, textSearchFilters } = args;
        let { first, after } = args
        if (!first || first < 1) {
            first = 10;
        }
        if (!after || after < 0) {
            after = 0;
        }
        let searchConditions = {}
        if (filters || textSearchFilters) {
            searchConditions = transformFilterFields(filters, textSearchFilters);
        }
        const invList = await Inventory.aggregate([
            {
                $match: {
                    ...searchConditions
                }
            },
            {
                $lookup: {
                    from: 'manufacturer',
                    localField: 'manufacturer',
                    foreignField: 'uuid',
                    as: 'manufacturer'
                }
            },
            {
                $unwind: {
                    path: '$manufacturer',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'category',
                    localField: 'category',
                    foreignField: 'uuid',
                    as: 'category'
                }
            },
            {
                $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'vendor',
                    localField: 'vendors',
                    foreignField: 'uuid',
                    as: 'vendors'
                }
            },
            {
                $unwind: {
                    path: '$vendors',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'category',
                    localField: 'category',
                    foreignField: 'uuid',
                    as: 'category'
                }
            },
            {
                $unwind: {
                    path: '$category',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'vendor',
                    localField: 'vendors',
                    foreignField: 'uuid',
                    as: 'vendors'
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
        ])
        const hasNextPage = invList.length > first;
        const listOfAllInvs = hasNextPage ? invList.slice(0, -1) : invList;
        const response = {
            invList: [
                ...listOfAllInvs
            ],
            hasMore: hasNextPage
        }
        return response;
    },
    inventory: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `)
        if (!args?.uuid) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        return await Inventory.findOne({ uuid: args?.uuid }).lean();
    },
}