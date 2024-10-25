import { Department, type DepartmentSchema } from "../../models/department.ts";
import { QueryResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { transformFilterFields } from "../../utils/index.ts";

export const departmentQueries: QueryResolvers = {
    department: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { uuid } = args
        const departmentValue = await Department.findOne({ uuid }).lean()
        if (!departmentValue) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        return departmentValue
    },
    departmentList: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `)
        const { filters } = args
        let searchConditions = {}
        let { first, textSearchFilters } = args
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
        const departments: any = await Department.find(searchConditions).sort({
            createdAt: -1
        }).skip(after).limit(first + 1).lean()
        return {
            departments,
            hasMore: departments.length > first
        }
    }
}