import { Department, type DepartmentSchema } from "../../models/department.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const departmentMutations: MutationResolvers = {
    departmentCreate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { department } = args
        const newDepartment = new Department({
            ...department
        })
        const newDepartmentSaved = await newDepartment.save()
        return newDepartmentSaved.toObject()
    },
    departmentUpdate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { department } = args
        const departmentValue = await Department.findOne({ uuid: department?.uuid }).lean()
        if (!departmentValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const updatedDepartment = await Department.findOneAndUpdate({ uuid: department?.uuid }, { ...department }, { upsert: true }) as unknown as DepartmentSchema
        return updatedDepartment?.toObject()
    },
    departmentDelete: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { department } = args
        const departmentValue = await Department.findOne({ uuid: department?.uuid }).lean()
        if (!departmentValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const deletedDepartment = await Department.findOneAndUpdate({ uuid: department?.uuid }, {
            deleted: true,
            deletedAt: new Date().toISOString(),
            deletedBy: context.user?.uuid,
            deletedReason: department?.deletedReason,
            deletedNote: department?.deletedNote
        }, { upsert: true }) as unknown as DepartmentSchema
        return deletedDepartment?.toObject()
    }
}