import { QueryResolvers } from "../../generated/graphql.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { LocationProduct } from "../../models/locationProduct.ts";
import { serializedProductLookupAggregateQuery } from "../product/lookupQueries.ts";

export const locationProductQueries: QueryResolvers = {
    locationProductList: async (
        parent: any,
        args: any,
        context: any,
        info: any
    ) => {
        try {
            console.log(`
            parent: ${parent},\n
            args: ${args},\n
            context: ${context},\n
            info ${info}\n
        `);
            const {
                filters = {},
                after = 0,
                first = 10,
            } = args as {
                filters: Record<string, any>;
                after: number;
                first: number;
            };
            let searchConditions = {};
            if (filters) {
                searchConditions = {
                    ...filters,
                };
            }
            const locationProducts = await LocationProduct.aggregate([
                {
                    $match: searchConditions,
                },
                {
                    $lookup: {
                        from: "products",
                        let: { product: "$product", productLocation: "$location" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$uuid", "$$product"],
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: 'serializedproducts',
                                    let: { product: '$uuid', location: '$$productLocation' },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ['$deleted', false] },
                                                        { $eq: ['$product', '$$product'] },
                                                        { $eq: ['$locationId', '$$location'] }
                                                    ]
                                                }
                                            }
                                        },
                                        { $project: { _id: 0, uuid: 1, number: 1 } }
                                    ],
                                    as: 'serializedProducts'
                                }
                            },
                        ],
                        as: "product",
                    },
                },
                {
                    $unwind: {
                        path: "$product",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "location",
                        foreignField: "uuid",
                        as: "location",
                    },
                },
                {
                    $unwind: {
                        path: "$location",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $skip: after,
                },
                {
                    $limit: first + 1,
                },
            ]);
            const hasNextPage = locationProducts.length > first;
            const locationProductList = hasNextPage
                ? locationProducts.slice(0, -1)
                : locationProducts;
            return {
                locationProducts: locationProductList,
                hasMore: hasNextPage,
            };
        } catch (error: any) {
            console.error(`Error in locationProductList: ${error.stack}`);
            throw new GraphQLError(
                ReasonPhrases.BAD_REQUEST +
                ` Unable to process list of products in a location`,
                {
                    extensions: {
                        code: StatusCodes.BAD_REQUEST,
                        http: { status: StatusCodes.BAD_REQUEST },
                    },
                }
            );
        }
    },
    // get the location agregration too like area, warehouse, rack, shelf, bin
    locationProductDetailsList: async (
        parent: any,
        args: any,
        context: any,
        info: any
    ) => {
        try {
            const {
                filters = {},
                after = 0,
                first = 10,
            } = args as {
                filters: Record<string, any>;
                after: number;
                first: number;
            };
            let searchConditions = {};
            if (filters) {
                searchConditions = {
                    ...filters,
                };
            }
            const locationProducts = await LocationProduct.aggregate([
                {
                    $match: searchConditions,
                },
                {
                    $lookup: {
                        from: "products",
                        let: { product: "$product", productLocation: "$location" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$uuid", "$$product"],
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: 'serializedproducts',
                                    let: { product: '$uuid', location: '$$productLocation' },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ['$deleted', false] },
                                                        { $eq: ['$product', '$$product'] },
                                                        { $eq: ['$locationId', '$$location'] }
                                                    ]
                                                }
                                            }
                                        },
                                        { $project: { _id: 0, uuid: 1, number: 1, project: 1 } }
                                    ],
                                    as: 'serializedProducts'
                                }
                            },
                        ],
                        as: "product",
                    },
                },
                {
                    $unwind: {
                        path: "$product",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: "locations",
                        let: { location: "$location" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$uuid", "$$location"],
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "warehouses",
                                    let: { warehouse: "$warehouse" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$uuid", "$$warehouse"],
                                                },
                                            },
                                        },
                                    ],
                                    as: "warehouse",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$warehouse",
                                    preserveNullAndEmptyArrays: true,
                                }
                            },
                            {
                                $lookup: {
                                    from: "areas",
                                    let: { area: "$area" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$uuid", "$$area"],
                                                },
                                            },
                                        },
                                    ],
                                    as: "area",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$area",
                                    preserveNullAndEmptyArrays: true,
                                }
                            },
                            {
                                $lookup: {
                                    from: "racks",
                                    let: { rack: "$rack" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$uuid", "$$rack"],
                                                },
                                            },
                                        },
                                    ],
                                    as: "rack",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$rack",
                                    preserveNullAndEmptyArrays: true,
                                }
                            },
                            {
                                $lookup: {
                                    from: "shelves",
                                    let: { shelf: "$shelf" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$uuid", "$$shelf"],
                                                },
                                            },
                                        },
                                    ],
                                    as: "shelf",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$shelf",
                                    preserveNullAndEmptyArrays: true,
                                }
                            },
                            {
                                $lookup: {
                                    from: "bins",
                                    let: { bin: "$bin" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $eq: ["$uuid", "$$bin"],
                                                },
                                            },
                                        },
                                    ],
                                    as: "bin",
                                },
                            },
                            {
                                $unwind: {
                                    path: "$bin",
                                    preserveNullAndEmptyArrays: true,
                                }
                            },
                        ],
                        as: "location",
                    },
                },
                {
                    $unwind: {
                        path: "$location",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $skip: after,
                },
                {
                    $limit: first + 1,
                },
            ]);
            const hasNextPage = locationProducts.length > first;
            const locationProductList = hasNextPage
                ? locationProducts.slice(0, -1)
                : locationProducts;
            return {
                locationProductDetails: locationProductList,
                hasMore: hasNextPage,
            };
        }
        catch (error: any) {
            console.error(`Error in locationProductDetailsList: ${error.stack}`);
            throw new GraphQLError(
                ReasonPhrases.BAD_REQUEST +
                ` Unable to process list of products in a location`,
                {
                    extensions: {
                        code: StatusCodes.BAD_REQUEST,
                        http: { status: StatusCodes.BAD_REQUEST },
                    },
                }
            );
        }
    },
    productsForWarehouse: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${args},\n 
                context: ${context},\n 
                info ${info}\n
            `);
            const { first = 10, after = 0, warehouse, filters = {} } = args as { filters?: Record<string, string | number | boolean>, first: number, after: number, warehouse: string };
            
            let productMongoFilters: Record<string, any>[] = [
                { '$eq': ['$deleted', false] },
                { '$eq': ['$uuid', '$$product'] }
            ]

            if(filters?.uuid) {
                productMongoFilters = productMongoFilters.filter(recordFilter => !recordFilter['$eq'][0].includes('uuid'));
            }

            for (const key in filters) {
                const value = [`$${key}`, filters[key]];
                if(key === 'name') {
                    productMongoFilters.push({ '$regexFind': { input: value[0], regex: value[1]} });
                    continue;
                }
                productMongoFilters.push({ '$eq': value });
            }

            const productsInWarehouse = await LocationProduct.aggregate([
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $lookup: {
                        from: 'locations',
                        let: { location: '$location' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            {
                                                $eq: ['$uuid', '$$location']
                                            },
                                            {
                                                $eq: ['$warehouse', warehouse]
                                            }
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    _id: 0,
                                    warehouse: 1
                                }
                            }
                        ],
                        as: 'location'
                    }
                },
                {
                    $unwind: {
                        path: '$location',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        let: { product: '$product' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $and: productMongoFilters }
                                }
                            },
                            serializedProductLookupAggregateQuery
                        ],
                        as: 'product'
                    }
                },
                {
                    $unwind: {
                        path: '$product',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $match: {
                        'location.warehouse': { $exists: true },
                        'product': { $exists: true }
                    }
                },
                {
                    $skip: after,
                },
                {
                    $limit: first + 1,
                },
                {
                    $group: {
                        _id: '$product._id',
                        product: { $first: '$product' },
                        warehouse: { $first: '$location.warehouse' },
                    }
                },
                {
                    $project: {
                        _id: 0,
                    }
                }
            ])

            const hasNextPage = productsInWarehouse.length > first;

            if (hasNextPage) {
                productsInWarehouse.pop();
            }

            return {
                productInWarehouse: productsInWarehouse,
                hasMore: hasNextPage,
            };

        } catch (error: any) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST + error?.message, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    }

};
