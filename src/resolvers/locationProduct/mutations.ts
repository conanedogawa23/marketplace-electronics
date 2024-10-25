import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { associateProductWithLocation } from "../../service/product.service.ts";
import { LocationProduct, LocationProductDocument } from "../../models/locationProduct.ts";

export const locationProductMutations: MutationResolvers = {
    locationProductCreate: async (parent, args, context, info) => {
        console.log(`
            parent: ${JSON.stringify(parent)},\n 
            args: ${JSON.stringify(args)},\n 
            context: ${context},\n 
            info ${JSON.stringify(info)}\n
        `)

        const { locationProduct: { product, location, quantity } } = args;

        if (!product || !location || (!quantity || quantity < 1)) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        const newLocationProduct = await associateProductWithLocation(product, location)
        if(!newLocationProduct) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const updatedLocationProduct = await LocationProduct.findOneAndUpdate({
            uuid: newLocationProduct
        }, {
            quantity: quantity,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: 'active'
        }, { upsert: true }) as unknown as LocationProductDocument;
        return updatedLocationProduct.toObject()
    },
    locationProductUpdate: async (parent, args, context, info) => {
        console.log(`
            parent: ${JSON.stringify(parent)},\n 
            args: ${JSON.stringify(args)},\n 
            context: ${context},\n 
            info ${JSON.stringify(info)}\n
        `)
        const { locationProduct: { uuid, quantity } } = args;

        if (!uuid || (!quantity || quantity < 1)) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }

        const updatedLocationProduct = await LocationProduct.findOneAndUpdate({
            uuid: uuid
        }, {
            quantity: quantity,
            updatedBy: context?.user?.uuid
        }, { upsert: true }) as unknown as LocationProductDocument;
        return updatedLocationProduct.toObject()
    },
    locationProductDelete: async (parent, args, context, info) => {
        console.log(`
            parent: ${JSON.stringify(parent)},\n 
            args: ${JSON.stringify(args)},\n 
            context: ${context},\n 
            info ${JSON.stringify(info)}\n
        `)
        const { locationProduct: { uuid } } = args;

        if (!uuid) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }

        const updatedLocationProduct = await LocationProduct.findOneAndUpdate({
            uuid: uuid
        }, {
            deleted: true,
            deletedBy: context?.user?.uuid,
            status: 'deleted'
        }, { upsert: true }) as unknown as LocationProductDocument;
        return updatedLocationProduct.toObject()
    }

}