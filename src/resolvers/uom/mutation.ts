import { Uom, type UomDocument } from "../../models/uom.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const uomMutations: MutationResolvers = {
    uomCreate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { uom } = args
        const newUom = new Uom({
            ...uom
        })
        const newUomSaved = await newUom.save()
        return newUomSaved.toObject()
    },
    uomUpdate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { uom } = args
        const uomValue = await Uom.findOne({ uuid: uom?.uuid }).lean()
        if (!uomValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const updatedUom = await Uom.findOneAndUpdate({ uuid: uom?.uuid }, { ...uom }, { upsert: true }) as unknown as UomDocument
        return updatedUom?.toObject()
    },
    uomDelete: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { uom } = args
        const uomValue = await Uom.findOne({ uuid: uom?.uuid }).lean()
        if (!uomValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const deletedUom = await Uom.findOneAndUpdate({ uuid: uom?.uuid }, {
            deleted: true,
            deletedAt: new Date().toISOString(),
            deletedBy: context.user?.uuid,
            deletedReason: uom?.deletedReason,
            deletedNote: uom?.deletedNote
        }, { upsert: true }) as unknown as UomDocument
        return deletedUom?.toObject()
    }
}