import { Uom, type UomDocument } from "../../models/uom.ts"
import { QueryResolvers } from "../../generated/graphql.ts"
import { GraphQLError } from "graphql"
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { transformFilterFields } from "../../utils/index.ts"

export const uomQueries: QueryResolvers = {
    uom: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { uuid } = args
        const uomValue = await Uom.findOne({ uuid }).lean() as UomDocument
        if (!uomValue) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        return uomValue
    },
    uomList: async (parent: any, args: any, context: any, info: any) => {
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
            searchConditions = transformFilterFields(filters);
        }
        const uoms = await Uom.find(searchConditions).sort({
            createdAt: -1
        }).skip(after).limit(first + 1).lean()
        return {
            uoms,
            hasMore: uoms.length > first
        }
    }
}