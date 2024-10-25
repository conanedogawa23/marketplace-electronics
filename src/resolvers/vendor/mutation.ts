import { Vendor, type VendorDocument } from "../../models/vendor.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const vendorMutations: MutationResolvers = {
    vendorCreate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { vendor } = args
        const newVendor = new Vendor({
            ...vendor
        })
        const newVendorSaved = await newVendor.save()
        return newVendorSaved.toObject()
    },
    vendorUpdate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { vendor } = args
        const vendorValue = await Vendor.findOne({ uuid: vendor?.uuid }).lean()
        if (!vendorValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const updatedVendor = await Vendor.findOneAndUpdate({ uuid: vendor?.uuid }, { ...vendor }, { upsert: true }) as unknown as VendorDocument
        return updatedVendor?.toObject()
    },
    vendorDelete: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { vendor } = args
        const vendorValue = await Vendor.findOne({ uuid: vendor?.uuid }).lean()
        if (!vendorValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const deletedVendor = await Vendor.findOneAndUpdate({ uuid: vendor?.uuid }, {
            deleted: true,
            deletedAt: new Date().toISOString(),
            deletedBy: context.user?.uuid,
            deletedReason: vendor?.deletedReason,
            deletedNote: vendor?.deletedNote
        }, { upsert: true }) as unknown as VendorDocument
        return deletedVendor?.toObject()
    }
}