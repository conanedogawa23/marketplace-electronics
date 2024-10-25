import { MutationResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ProjectProduct, ProjectLineItemLookupDocument } from "../../models/projectProduct.ts";

export const projectProductMutations: MutationResolvers = {
    projectProductCreate: async (parent, args, context, info) => {
        console.log(`
            parent: ${JSON.stringify(parent)},\n 
            args: ${JSON.stringify(args)},\n 
            context: ${context},\n 
            info ${JSON.stringify(info)}\n
        `)

        const { projectProduct: { product, project, quantity, allocated } } = args;

        if (!product || !project || !quantity || quantity <= 0) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        const newProjectProduct = new ProjectProduct({
            product: product,
            project: project,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: 'active',
            quantity: quantity,
            allocated: allocated
        });
        await newProjectProduct.save();
        return newProjectProduct.toObject()
    },
    projectProductUpdate: async (parent, args, context, info) => {
        console.log(`
            parent: ${JSON.stringify(parent)},\n 
            args: ${JSON.stringify(args)},\n 
            context: ${context},\n 
            info ${JSON.stringify(info)}\n
        `)
        const { projectProduct: { uuid } } = args;

        if (!uuid) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
        const updatedProjectProduct = await ProjectProduct.findOneAndUpdate({
            uuid: uuid
        }, {
            updatedBy: context?.user?.uuid,
        }, { upsert: true }) as unknown as ProjectLineItemLookupDocument;
        return updatedProjectProduct.toObject()
    },
    projectProductDelete: async (parent, args, context, info) => {
        console.log(`
            parent: ${JSON.stringify(parent)},\n 
            args: ${JSON.stringify(args)},\n 
            context: ${context},\n 
            info ${JSON.stringify(info)}\n
        `)
        const { projectProduct: { uuid } } = args;

        if (!uuid) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }

        const updatedProjectProduct = await ProjectProduct.findOneAndUpdate({
            uuid: uuid
        }, {
            status: 'deleted',
            updatedBy: context?.user?.uuid
        }, { upsert: true }) as unknown as ProjectLineItemLookupDocument;
        return updatedProjectProduct.toObject()
    }

}