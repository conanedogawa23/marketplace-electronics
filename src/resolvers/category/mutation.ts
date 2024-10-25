import { Category, type CategoryDocument } from "../../models/category.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const categoryMutations: MutationResolvers = {
    categoryCreate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { category } = args
        const newCategory = new Category({
            ...category
        })
        const newCategorySaved = await newCategory.save()
        return newCategorySaved.toObject()
    },
    categoryUpdate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { category } = args
        const categoryValue = await Category.findOne({ uuid: category?.uuid }).lean()
        if (!categoryValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const updatedCategory = await Category.findOneAndUpdate({ uuid: category?.uuid }, { ...category }, { upsert: true }) as unknown as CategoryDocument
        return updatedCategory?.toObject()
    },
    categoryDelete: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { category } = args
        const categoryValue = await Category.findOne({ uuid: category?.uuid }).lean()
        if (!categoryValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const deletedCategory = await Category.findOneAndUpdate({ uuid: category?.uuid }, {
            deleted: true,
            deletedAt: new Date().toISOString(),
            deletedBy: context.user?.uuid,
            deletedReason: category?.deletedReason,
            deletedNote: category?.deletedNote
        }, { upsert: true }) as unknown as CategoryDocument
        return deletedCategory?.toObject()
    }
}