import { VendorProduct, type VendorProductDocument } from "../../models/vendorProduct.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

export const vendorProductMutations: MutationResolvers = {
    vendorProductCreate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { vendorProduct } = args
        // check if vendorId and productId exists
        const vendorProductValue = await VendorProduct.findOne({ vendor: vendorProduct?.vendor, product: vendorProduct?.product }).lean()
        if (vendorProductValue) {
            // update the price
            const updatedVendorProduct = await VendorProduct.findOneAndUpdate({ 
                vendor: vendorProduct?.vendor, product: vendorProduct?.product }, 
                { ...vendorProduct }, 
                { upsert: true }) as unknown as VendorProductDocument

            return updatedVendorProduct?.toObject()
        }
        const newVendorProduct = new VendorProduct({
            ...vendorProduct
        })
        const newVendorProductSaved = await newVendorProduct.save()
        return newVendorProductSaved.toObject()
    },
    vendorProductUpdate: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { vendorProduct } = args
        const vendorProductValue = await VendorProduct.findOne({ uuid: vendorProduct?.uuid }).lean()
        if (!vendorProductValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const updatedVendorProduct = await VendorProduct.findOneAndUpdate({ uuid: vendorProduct?.uuid }, { ...vendorProduct }, { upsert: true }) as unknown as VendorProductDocument
        return updatedVendorProduct?.toObject()
    }
}