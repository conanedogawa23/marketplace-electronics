import { VendorProduct, type VendorProductDocument } from "../../models/vendorProduct.ts";
import { QueryResolvers, VendorProductList } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { transformFilterFields } from "../../utils/index.ts";

export const vendorProductQueries: QueryResolvers = {
    vendorProductList: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { filters } = args
        let searchConditions = {}
        let { first } = args
        if (!first || first < 1) {
            first = 10;
        }
        let { after } = args
        if (!after || after < 0) {
            after = 0;
        }
        if (filters) {
            searchConditions = transformFilterFields(filters)
        }
        const vendorProducts = await VendorProduct.aggregate([
            {
                $match: searchConditions
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product',
                    foreignField: 'uuid',
                    as: 'product'
                }
            },
            {
                $unwind: {
                    path: '$product',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'vendors',
                    localField: 'vendor',
                    foreignField: 'uuid',
                    as: 'vendor'
                }
            },
            {
                $unwind: {
                    path: '$vendor',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $skip: after
            },
            {
                $limit: first + 1
            }
        ])
        const hasNextPage = vendorProducts.length > first
        const vendorProductsList = hasNextPage ? vendorProducts.slice(0, first) : vendorProducts
        return {
            vendorProducts: vendorProductsList,
            hasMore: vendorProducts.length > first
        }
    }
}