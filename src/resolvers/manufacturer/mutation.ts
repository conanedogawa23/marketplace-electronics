import { Manufacturer, type ManufacturerDocument } from "../../models/manufacturer.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const manufacturerMutations: MutationResolvers = {
    manufacturerCreate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { manufacturer } = args
        const newManufacturer = new Manufacturer({
            ...manufacturer
        })
        const newManufacturerSaved = await newManufacturer.save()
        return newManufacturerSaved.toObject()
    },
    manufacturerUpdate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { manufacturer } = args
        const manufacturerValue = await Manufacturer.findOne({ uuid: manufacturer?.uuid }).lean()
        if (!manufacturerValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const updatedManufacturer = await Manufacturer.findOneAndUpdate({ uuid: manufacturer?.uuid }, { ...manufacturer }, { upsert: true }) as unknown as ManufacturerDocument
        return updatedManufacturer?.toObject()
    },
    manufacturerDelete: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { manufacturer } = args
        const manufacturerValue = await Manufacturer.findOne({ uuid: manufacturer?.uuid }).lean()
        if (!manufacturerValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const deletedManufacturer = await Manufacturer.findOneAndUpdate({ uuid: manufacturer?.uuid }, {
            deleted: true,
            deletedAt: new Date().toISOString(),
            deletedBy: context.user?.uuid,
            deletedReason: manufacturer?.deletedReason,
            deletedNote: manufacturer?.deletedNote
        }, { upsert: true }) as unknown as ManufacturerDocument
        return deletedManufacturer?.toObject()
    }
}