import { GraphQLError } from "graphql";
import { QueryResolvers } from "../../generated/graphql.ts";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Product } from "../../models/product.ts";
import { PurchaseOrder } from "../../models/purchaseOrder.ts";

export const receiveOrderQueries: QueryResolvers = {
    receiveOrderList: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${args},\n 
                context: ${context},\n 
                info ${info}\n    
            `);
            const { query, first, after } = args as { query: Record<string, any>, first: number, after: number };

            const products = await Product.find({
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                ]
            }).select('name description uuid')
                .limit(first)
                .skip(after)
                .lean();

            const purchaseOrders = await PurchaseOrder.find({
                $or: [
                    { default_ship: { $regex: query, $options: 'i' } },
                    { custom_id: { $regex: query, $options: 'i' } },
                    { notes: { $regex: query, $options: 'i' } },
                    { ship_name: { $regex: query, $options: 'i' } },
                    { status: { $regex: query, $options: 'i' } },
                    { shipping_option: { $regex: query, $options: 'i' } }
                ]
            }).select('default_ship custom_id notes ship_name status shipping_option uuid')
                .limit(first)
                .skip(after)
                .lean();

            let b = products.map(product => {
                return {
                    product: true,
                    purchaseOrder: false,
                    ...product
                }
            })

            let a = purchaseOrders.map(po => {
                return {
                    product: false,
                    purchaseOrder: true,
                    uuid: po.uuid,
                    name: `${po.custom_id}-${po.notes || po.status}`,
                    description: `${po.custom_id}-${po.notes || po.status}`,
                }
            })

            return [...a, ...b];

        } catch (error) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    }
}