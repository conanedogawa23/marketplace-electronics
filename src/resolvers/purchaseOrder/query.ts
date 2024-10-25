import { PurchaseOrder } from "../../models/purchaseOrder.ts";
import { QueryResolvers } from "../../generated/graphql.ts";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { GraphQLError } from "graphql";
import { projectLookupAggregateQuery, purchasingSourceLookupAggregateQuery } from "./lookupQueries.ts";
import { purchaseOrderProduct } from "../../models/purchaseOrderProduct.ts";
import { categoryLookupAggregateQuery, locationProductLookupAggregateQuery, manufacturerLookupAggregateQuery, pricingLookupAggregateQuery, serializedProductLookupAggregateQuery, uomLookupAggregateQuery } from "../product/lookupQueries.ts";
import { transformFilterFields } from "../../utils/index.ts";


export const purchaseOrderQueries: QueryResolvers = {
    purchaseOrder: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
        const { uuid } = args
        const availablePurchaseOrder: any = await PurchaseOrder.findOne({ uuid })
            .populate({
                path: "project",
                localField: "project",
                foreignField: "uuid"
            })
            .populate({
                path: "purchasingSource",
                localField: "purchasingSource",
                foreignField: "uuid"
            }).exec();

        return availablePurchaseOrder
    },
    purchaseOrderList: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `)
            const { filters, textSearchFilters } = args
            let searchConditions = {}
            let { first } = args
            if (!first || first < 1) {
                first = 10;
            }
            let { after } = args
            if (!after || after < 0) {
                after = 0;
            }
            if (filters || textSearchFilters) {
                searchConditions = transformFilterFields(filters, textSearchFilters)
            }

            const purchaseOrderResults = await PurchaseOrder.aggregate([
                {
                    $match: searchConditions
                },
                projectLookupAggregateQuery,
                { $unwind: { path: "$project", preserveNullAndEmptyArrays: true } },
                purchasingSourceLookupAggregateQuery,
                { $unwind: { path: "$purchasingSource", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        uuid: 1,
                        deleted: 1,
                        deletedAt: 1,
                        deletedBy: 1,
                        createdBy: 1,
                        updatedBy: 1,
                        deletedReason: 1,
                        deletedNote: 1,
                        project: 1,
                        purchasingSource: 1,
                        custom_id: 1,
                        default_ship: 1,
                        notes: 1,
                        status: 1,
                        shipping_option: 1,
                        ship_name: 1,
                        ship_address: 1
                    }
                },
                {
                    $facet: {
                        results: [
                            { $sort: { 'createdAt': -1 } },
                            { $skip: after },
                            { $limit: first },
                        ],
                        totalCount: [
                            { $count: 'count' }
                        ]
                    }
                },
            ])

            return {
                purchaseOrders: purchaseOrderResults[0]?.results,
                hasMore: purchaseOrderResults?.[0].totalCount?.[0]?.count > first + after
            }
        } catch (error) {
            console.log(error);

            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
    },
    purchaseOrderItemsList: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${args},\n 
                context: ${context},\n 
                info ${info}\n
            `)
            const { purchaseOrderId } = args
            let { first } = args
            if (!first || first < 1) {
                first = 10;
            }
            let { after } = args
            if (!after || after < 0) {
                after = 0;
            }

            const purchaseOrderItemsLookup = await purchaseOrderProduct.aggregate([
                {
                    $match: {
                        "purchase_order": purchaseOrderId
                    }
                },
                {
                    $lookup: {
                        from: "products",
                        let: { product: "$product" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$uuid", "$$product"] }
                                }
                            },
                            categoryLookupAggregateQuery,
                            { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
                            manufacturerLookupAggregateQuery,
                            { $unwind: { path: '$manufacturer', preserveNullAndEmptyArrays: true } },
                            uomLookupAggregateQuery,
                            { $unwind: { path: '$uom', preserveNullAndEmptyArrays: true } },
                            pricingLookupAggregateQuery,
                            { $unwind: { path: '$pricing', preserveNullAndEmptyArrays: true } },
                            serializedProductLookupAggregateQuery,
                            locationProductLookupAggregateQuery,
                            { $unwind: { path: '$location', preserveNullAndEmptyArrays: true } },
                            {
                                $project: {
                                    category: 1,
                                    name: 1,
                                    description: 1,
                                    tags: 1,
                                    width: 1,
                                    height: 1,
                                    weight: 1,
                                    length: 1,
                                    manufacturer: 1,
                                    uom: 1,
                                    vendors: 1,
                                    quantity: 1,
                                    createdAt: 1,
                                    updatedAt: 1,
                                    status: 1,
                                    uuid: 1,
                                    sku: 1,
                                    image: 1,
                                    serialized: 1,
                                    location: 1,
                                    price: '$pricing',
                                    createdBy: 1,
                                    updatedBy: 1,
                                    serializedProducts: 1
                                }
                            }
                        ],
                        as: "product",
                    },
                },
                {
                    $unwind: { path: '$product', preserveNullAndEmptyArrays: true }
                },
                { $sort: { "createdAt": -1 } },
                {
                    $facet: {
                        results: [
                            { $skip: after },
                            { $limit: first },
                        ],
                        totalCount: [
                            { $count: 'count' }
                        ]
                    }
                },
            ])

            // const projectItems = purchaseOrderItemsLookup?.[0].results.map((item: any) => {
            //     return item.product;
            // })

            return {
                purchaseOrderItems: purchaseOrderItemsLookup?.[0].results,
                hasMore: purchaseOrderItemsLookup?.[0].totalCount?.[0]?.count > after + first
            }
        } catch (error) {
            console.log(error);

            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST }
                }
            })
        }
    }
}