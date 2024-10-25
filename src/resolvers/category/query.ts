import { Category, type CategoryDocument } from "../../models/category.ts";
import { QueryResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { transformFilterFields } from "../../utils/index.ts";

export const categoryQueries: QueryResolvers = {
    category: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { uuid } = args
        const categoryValue = await Category.findOne({ uuid }).lean() as CategoryDocument
        if (!categoryValue) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        return categoryValue
    },
    categoryList: async (parent: any, args: any, context: any, info: any) => {
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
        const categories = await Category.find(searchConditions).sort({
            createdAt: -1
        }).skip(after).limit(first + 1).lean()
        return {
            categories,
            hasMore: categories.length > first
        }
    }
}