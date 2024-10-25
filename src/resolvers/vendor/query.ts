import { Vendor, type VendorDocument } from "../../models/vendor.ts"
import { QueryResolvers, VendorList } from "../../generated/graphql.ts"
import { GraphQLError } from "graphql"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { transformFilterFields } from "../../utils/index.ts"

export const vendorQueries: QueryResolvers = {
    vendor: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { uuid } = args
        const vendorValue = await Vendor.findOne({ uuid }).lean() as VendorDocument
        if (!vendorValue) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        return vendorValue
    },
    vendorList: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { filters, textSearchFilters } = args
        let searchConditions = {}
        let { first } = args
        if (!first || first < 1) {
            first = 10;
        }
        let { after } = args
        if (!after || after < 0) {
            after = 0;
        }
        if (filters || textSearchFilters) {
            searchConditions = transformFilterFields(filters, textSearchFilters);
        }
        const vendors = await Vendor.find(searchConditions).sort({
            createdAt: -1
        }).skip(after).limit(first + 1).lean()
        return {
            vendors,
            hasMore: vendors.length > first
        }
    }
}