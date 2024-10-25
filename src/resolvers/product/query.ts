import { Product } from "../../models/product.ts";
import { QueryResolvers } from "../../generated/graphql.ts";
import { getAllAttachmentsRelatedToProduct } from "../../service/product.service.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ProductType, RoleStatus, ActivityLogType } from "../../config/common/status.ts";
import { SerializedProduct } from "../../models/serializedProduct.ts";
import { ActivityLog, ReasonLog } from "../../models/activityLogs.ts";
import { Location } from "../../models/locations.ts";
import { LocationProduct } from "../../models/locationProduct.ts";
import {
    attachmentLookupAggregateQuery,
    categoryLookupAggregateQuery,
    locationProductLookupAggregateQuery,
    manufacturerLookupAggregateQuery,
    pricingLookupAggregateQuery,
    serializedProductLookupAggregateQuery,
    uomLookupAggregateQuery,
    receiveStockTrackingLookupAggregateQuery
} from "./lookupQueries.ts";
import { transformFilterFields } from "../../utils/index.ts";

export const productQueries: QueryResolvers = {
    product: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${args},\n 
                context: ${context},\n 
                info ${info}\n
            `);
            const [productDetails] = await Product.aggregate([
                {
                    $match: {
                        uuid: args?.uuid,
                    },
                },
                categoryLookupAggregateQuery,
                manufacturerLookupAggregateQuery,
                uomLookupAggregateQuery,
                attachmentLookupAggregateQuery,
                pricingLookupAggregateQuery,
                serializedProductLookupAggregateQuery,
                {
                    $unwind: {
                        path: "$category",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $unwind: {
                        path: "$manufacturer",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $unwind: {
                        path: "$uom",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $unwind: {
                        path: "$pricing",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        let: { createdBy: "$createdBy" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$$createdBy", "$uuid"],
                                    },
                                },
                            },
                        ],
                        as: "createdBy",
                    },
                },
                {
                    $unwind: {
                        path: "$createdBy",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: "locationProducts",
                        let: { product: "$uuid" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$product", "$$product"],
                                    },
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
                                $project: {
                                    location: 1,
                                    _id: 0,
                                },
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
                    $project: {
                        _id: 0,
                        uuid: 1,
                        name: 1,
                        description: 1,
                        tags: 1,
                        category: 1,
                        manufacturer: 1,
                        width: 1,
                        height: 1,
                        weight: 1,
                        length: 1,
                        uom: 1,
                        attachments: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        image: 1,
                        sku: 1,
                        serialized: 1,
                        type: 1,
                        status: 1,
                        maxQuantity: 1,
                        minQuantity: 1,
                        createdBy: 1,
                        updatedBy: 1,
                        quantity: 1,
                        notes: 1,
                        price: "$pricing",
                        serializedProducts: "$serializedProducts",
                        location: "$location",
                        onUsed: 1
                    },
                },
            ]);
            if (productDetails.attachments && productDetails.attachments.length > 0) {
                const uuids = productDetails.attachments.map(
                    (attachment: any) => attachment.uuid
                );
                productDetails.attachments = await getAllAttachmentsRelatedToProduct(
                    uuids
                );
            }
            if (productDetails.image) {
                [productDetails.image] = await getAllAttachmentsRelatedToProduct([
                    productDetails.image,
                ]);
            }
            return productDetails;
        } catch (error) {
            console.log(error);
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    productList: async (parent, args, context, info) => {
        try {
            console.log(`
                parent: ${parent},\n
                args: ${args},\n
                context: ${context},\n
                info ${info}\n
            `);

            const { filters } = args;
            let searchConditions = {};
            if (filters && Object.keys(filters).length !== 0) {
                const { name, sku, description, uuid, ...otherFilters } = filters;
                searchConditions = {
                    ...(name && { name: { $regex: name, $options: "i" } }),
                    ...(sku && { sku: { $regex: sku, $options: "i" } }),
                    ...(description && {
                        description: { $regex: description, $options: "i" },
                    }),
                    ...(uuid && { uuid: { $in: uuid.split(",") } }),
                    ...otherFilters
                };
            }

            const { first = 10, after = 0 } = args;

            const products = await Product.aggregate([
                { $match: searchConditions },
                { $sort: { createdAt: -1 } },
                { $skip: after || 0 },
                { $limit: (first || 10) + 1 },
                categoryLookupAggregateQuery,
                {
                    $unwind: {
                        path: "$category",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                manufacturerLookupAggregateQuery,
                {
                    $unwind: { path: "$manufacturer", preserveNullAndEmptyArrays: true },
                },
                uomLookupAggregateQuery,
                { $unwind: { path: "$uom", preserveNullAndEmptyArrays: true } },
                pricingLookupAggregateQuery,
                { $unwind: { path: "$pricing", preserveNullAndEmptyArrays: true } },
                serializedProductLookupAggregateQuery,
                locationProductLookupAggregateQuery,
                { $unwind: { path: "$location", preserveNullAndEmptyArrays: true } },
                receiveStockTrackingLookupAggregateQuery,
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
                        adjusted: 1,
                        locations: 1,
                        price: "$pricing",
                        createdBy: 1,
                        updatedBy: 1,
                        serializedProducts: 1,
                        receiveStockProducts: 1,
                        onUsed: 1
                    },
                },
            ]);

            const hasNextPage = products.length > (first || 10);
            const listOfAllProducts = hasNextPage ? products.slice(0, -1) : products;

            if (listOfAllProducts.length > 0) {
                listOfAllProducts.forEach((product) => {
                    if (product.locations && product.locations.length > 0) {
                        product.locations = product.locations.map((location: any) => {
                            const { quantity, onUsed } = location;
                            location.location = {
                                ...location.location,
                                quantity,
                                onUsed
                            }
                            return location.location;
                        });
                    }
                });
            }
            console.log(listOfAllProducts[0].locations);

            if (listOfAllProducts.length > 0) {
                const images = listOfAllProducts.map((product) => product.image);
                if (images.length > 0) {
                    const imageUrls = await getAllAttachmentsRelatedToProduct(images);
                    for (let i = 0; i < listOfAllProducts.length; i++) {
                        listOfAllProducts[i].image = imageUrls[i];
                    }
                }
            }

            return {
                products: listOfAllProducts,
                hasMore: hasNextPage,
            };
        } catch (error) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    productFilterList: async (parent, args, context, info) => {
        try {
            console.log(`
                parent: ${parent},\n
                args: ${args},\n
                context: ${context},\n
                info ${info}\n
            `);

            const { filters, textSearchFields } = args;
            let searchConditions = {};

            if (filters || textSearchFields) {

                searchConditions = {
                    ...transformFilterFields(filters, textSearchFields),
                    ...(filters?.uuid && { uuid: { $in: filters.uuid.split(",") } }),
                };
            }

            const { first = 10, after = 0 } = args;

            const products = await Product.aggregate([
                { $match: searchConditions },
                { $sort: { createdAt: -1 } },
                { $skip: after || 0 },
                { $limit: (first || 10) + 1 },
                categoryLookupAggregateQuery,
                {
                    $unwind: {
                        path: "$category",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                manufacturerLookupAggregateQuery,
                {
                    $unwind: { path: "$manufacturer", preserveNullAndEmptyArrays: true },
                },
                pricingLookupAggregateQuery,
                { $unwind: { path: "$pricing", preserveNullAndEmptyArrays: true } },
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
                        vendors: 1,
                        quantity: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        status: 1,
                        uuid: 1,
                        sku: 1,
                        image: 1,
                        adjusted: 1,
                        price: "$pricing",
                        createdBy: 1,
                        updatedBy: 1,
                        onUsed: 1
                    },
                },
            ]);

            const hasNextPage = products.length > (first || 10);
            const listOfAllProducts = hasNextPage ? products.slice(0, -1) : products;

            // convert the listoFproducts.locations field that contains location object inside each elemnt into a locations array
            if (listOfAllProducts.length > 0) {
                listOfAllProducts.forEach((product) => {
                    if (product.locations && product.locations.length > 0) {
                        product.locations = product.locations.map((location: any) => location.location);
                    }
                });
            }

            if (listOfAllProducts.length > 0) {
                const images = listOfAllProducts.map((product) => product.image);
                if (images.length > 0) {
                    const imageUrls = await getAllAttachmentsRelatedToProduct(images);
                    for (let i = 0; i < listOfAllProducts.length; i++) {
                        listOfAllProducts[i].image = imageUrls[i];
                    }
                }
            }

            return {
                products: listOfAllProducts,
                hasMore: hasNextPage,
            };
        } catch (error) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    productTypes: (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(
                `parent: ${parent},\n
                args: ${args},\n
                context: ${context},\n
                info ${info}\n
            `
            );
            return Object.keys(ProductType);
        } catch (error) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    serializedProducts: async (
        parent: any,
        args: any,
        context: any,
        info: any
    ) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n    
        `);
        const { filter } = args;
        if (!filter?.product) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
        const { filters, textSearchFields } = args;
        let searchConditions = {};
        searchConditions = transformFilterFields(filters, textSearchFields);
        let { first } = args;
        if (!first || first < 1) {
            first = 10;
        }
        let { after } = args;
        if (!after || after < 0) {
            after = 0;
        }
        const serializedProducts = await SerializedProduct.aggregate([
            {
                $match: searchConditions,
            },
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "uuid",
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
        const hasNextPage = serializedProducts.length > first;
        const listOfAllSerializedProducts = hasNextPage
            ? serializedProducts.slice(0, -1)
            : serializedProducts;
        const response = {
            serializedProducts: [...listOfAllSerializedProducts],
            hasMore: hasNextPage,
        };
        return response;
    },
    reasonLogList: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${JSON.stringify(args)},\n 
                context: ${context},\n 
                info ${info}\n    
            `);
            let { filters = {}, first, after, textSearchFields } = args;
            if (!first) {
                first = 10;
            }
            if (!after) {
                after = 0;
            }
            filters = {
                ...filters,
                status: RoleStatus.Active
            }
            const reasonLogData = await ReasonLog.aggregate([
                {
                    $match: {
                        ...transformFilterFields(filters, textSearchFields),
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
                {
                    $project: {
                        _id: 0,
                        uuid: 1,
                        name: 1,
                        description: 1,
                        createdBy: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        deleted: 1,
                        deletedAt: 1,
                        deletedBy: 1,
                        deletedReason: 1,
                        deletedNote: 1,
                        status: 1,
                    }
                }
            ])
            const hasNextPage = reasonLogData.length > first;
            const reasonLogDataList = hasNextPage
                ? reasonLogData.slice(0, -1)
                : reasonLogData;
            const response = {
                reasonLogs: [...reasonLogDataList],
                hasMore: hasNextPage,
            };
            return response;
        } catch (error) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    activityLogDetails: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n
                args: ${JSON.stringify(args)},\n
                context: ${context},\n
                info ${info}\n
            `)
            const { uuid } = args;
            const [activityLogData] = await ActivityLog.aggregate([
                {
                    $match: {
                        ...(uuid && { uuid }),
                        status: RoleStatus.Active
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $lookup: {
                        from: "products",
                        let: { product: '$track.product' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$uuid', '$$product']
                                    }
                                }
                            },
                        ],
                        as: "products",
                    },
                },
                {
                    $lookup: {
                        from: 'projectproducts',
                        let: {project: '$track.project'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$project', '$$project']
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: 'products',
                                    localField: 'product',
                                    foreignField: 'uuid',
                                    as: 'product'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$product',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            // aggregrate project
                            {
                                $lookup: {
                                    from: 'projects',
                                    localField: 'project',
                                    foreignField: 'uuid',
                                    as: 'project'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$project',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                        ],
                        as: 'projectProducts'
                    }
                },
                {
                    $lookup: {
                        from: 'serializedproducts',
                        let: { product: '$products.uuid' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$product', '$$product']
                                    }
                                }
                            }
                        ],
                        as: 'serializedProducts'
                    }
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "track.toLocation",
                        foreignField: "uuid",
                        as: "toLocation",
                    },
                },
                {
                    $lookup: {
                        from: "locations",
                        localField: "track.fromLocation",
                        foreignField: "uuid",
                        as: "fromLocation",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "uuid",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'reasonlogs',
                        localField: 'activityReason',
                        foreignField: 'uuid',
                        as: 'reasonLog'
                    }
                },
                {
                    $unwind: {
                        path: '$reasonLog',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        uuid: 1,
                        track: 1,
                        activityId: 1,
                        description: 1,
                        name: 1,
                        type: 1,
                        note: 1,
                        status: 1,
                        deleted: 1,
                        deletedAt: 1,
                        deletedBy: 1,
                        deletedReason: 1,
                        deletedNote: 1,
                        createdAt: 1,
                        createdBy: "$user.email",
                        updatedAt: 1,
                        products: 1,
                        toLocation: 1,
                        fromLocation: 1,
                        reasonLog: 1,
                        updatedBy: 1,
                        serializedProducts: 1,
                        projectProducts: 1
                    },
                }
            ]);

            console.log(activityLogData);
            return activityLogData;
        } catch (error: any) {
            console.error(error?.message as string)
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    activityLogDetailsListAdjust: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n
                args: ${JSON.stringify(args)},\n
                context: ${context},\n
                info ${info}\n
            `)
            const { filters } = args
            let searchConditions = {}
            let { first } = args
            if (!first || first < 1) {
                first = 10;
            }
            let { after } = args
            if (!after || after < 0) {
                after = 0;
            }
            if (filters) {
                searchConditions = transformFilterFields(filters);
            }
            const activityLogData = await ActivityLog.aggregate([
                {
                    $match: {
                        ...searchConditions,
                        type: {
                            $in: [ActivityLogType.ADJUST_STOCK, ActivityLogType.RECEIVE_STOCK, ActivityLogType.TRANSFER_STOCK] 
                        },
                        status: RoleStatus.Active
                    },
                },
                {
                    $sort: {
                        createdAt: -1,
                    },
                },
                {
                    $skip: after || 0,
                },
                {
                    $limit: (first || 10) + 1,
                },
                {
                    $lookup: {
                        from: "products",
                        let: { product: '$track.product' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$uuid', '$$product']
                                    }
                                }
                            },
                        ],
                        as: "products",
                    },
                },
                {
                    $lookup: {
                        from: 'projectproducts',
                        let: {project: '$track.project'},
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$project', '$$project']
                                    }
                                }
                            },
                            {
                                $lookup: {
                                    from: 'products',
                                    localField: 'product',
                                    foreignField: 'uuid',
                                    as: 'product'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$product',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            // aggregrate project
                            {
                                $lookup: {
                                    from: 'projects',
                                    localField: 'project',
                                    foreignField: 'uuid',
                                    as: 'project'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$project',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                        ],
                        as: 'projectProducts'
                    }
                },
                {
                    $lookup: {
                        from: 'serializedproducts',
                        let: { product: '$products.uuid' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$product', '$$product']
                                    }
                                }
                            }
                        ],
                        as: 'serializedProducts'
                    }
                },
                {
                    $lookup: {
                        from: "locations",
                        let: { location: '$track.toLocation' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$uuid', '$$location']
                                    }
                                },
                            },
                            {
                                $lookup: {
                                    from: 'areas',
                                    localField: 'area',
                                    foreignField: 'uuid',
                                    as: 'area'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$area',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            // find rack
                            {
                                $lookup: {
                                    from: 'racks',
                                    localField: 'rack',
                                    foreignField: 'uuid',
                                    as: 'rack'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$rack',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            // find shelf
                            {
                                $lookup: {
                                    from: 'shelves',
                                    localField: 'shelf',
                                    foreignField: 'uuid',
                                    as: 'shelf'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$shelf',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            // find bin
                            {
                                $lookup: {
                                    from: 'bins',
                                    localField: 'bin',
                                    foreignField: 'uuid',
                                    as: 'bin'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$bin',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $lookup: {
                                    from: 'warehouses',
                                    localField: 'warehouse',
                                    foreignField: 'uuid',
                                    as: 'warehouse'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$warehouse',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $project: {
                                    uuid: 1,
                                    warehouse: 1,
                                    area: 1,
                                    rack: 1,
                                    shelf: 1,
                                    bin: 1,
                                    _id: 0
                                }
                            }
                        ],

                        as: "toLocation",
                    },
                },
                {
                    $lookup: {
                        from: "locations",
                        let: { location: '$track.fromLocation' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$uuid', '$$location']
                                    }
                                },
                            },
                            {
                                $lookup: {
                                    from: 'areas',
                                    localField: 'area',
                                    foreignField: 'uuid',
                                    as: 'area'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$area',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            // find rack
                            {
                                $lookup: {
                                    from: 'racks',
                                    localField: 'rack',
                                    foreignField: 'uuid',
                                    as: 'rack'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$rack',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            // find shelf
                            {
                                $lookup: {
                                    from: 'shelves',
                                    localField: 'shelf',
                                    foreignField: 'uuid',
                                    as: 'shelf'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$shelf',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            // find bin
                            {
                                $lookup: {
                                    from: 'bins',
                                    localField: 'bin',
                                    foreignField: 'uuid',
                                    as: 'bin'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$bin',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $lookup: {
                                    from: 'warehouses',
                                    localField: 'warehouse',
                                    foreignField: 'uuid',
                                    as: 'warehouse'
                                }
                            },
                            {
                                $unwind: {
                                    path: '$warehouse',
                                    preserveNullAndEmptyArrays: true
                                }
                            },
                            {
                                $project: {
                                    uuid: 1,
                                    warehouse: 1,
                                    area: 1,
                                    rack: 1,
                                    shelf: 1,
                                    bin: 1,
                                    _id: 0
                                }
                            }
                        ],

                        as: "fromLocation",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "createdBy",
                        foreignField: "uuid",
                        as: "user",
                    },
                },
                {
                    $unwind: {
                        path: "$user",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: 'reasonlogs',
                        localField: 'activityReason',
                        foreignField: 'uuid',
                        as: 'reasonLog'
                    }
                },
                {
                    $unwind: {
                        path: '$reasonLog',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        uuid: 1,
                        track: 1,
                        activityId: 1,
                        description: 1,
                        name: 1,
                        type: 1,
                        note: 1,
                        status: 1,
                        deleted: 1,
                        deletedAt: 1,
                        deletedBy: 1,
                        deletedReason: 1,
                        deletedNote: 1,
                        createdAt: 1,
                        createdBy: "$user.email",
                        updatedAt: 1,
                        products: 1,
                        toLocation: 1,
                        fromLocation: 1,
                        reasonLog: 1,
                        updatedBy: 1,
                        serializedProducts: 1,
                        projectProducts: 1
                    },
                }
            ]);

            const hasNextPage = activityLogData.length > first;
            const listOfAllActivityLogs = hasNextPage
                ? activityLogData.slice(0, -1)
                : activityLogData;

            return {
                activityLogDetails: [...listOfAllActivityLogs],
                hasMore: hasNextPage,
            };
        } catch (error: any) {
            console.error(error?.message as string)
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    getUnauthorizedProductDetails: async (
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
            const [productDetails] = await Product.aggregate([
                {
                    $match: {
                        uuid: args?.uuid,
                    },
                },
                attachmentLookupAggregateQuery,
                pricingLookupAggregateQuery,
                serializedProductLookupAggregateQuery,
                {
                    $unwind: {
                        path: "$pricing",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 0,
                        uuid: 1,
                        name: 1,
                        description: 1,
                        tags: 1,
                        category: 1,
                        manufacturer: 1,
                        width: 1,
                        height: 1,
                        weight: 1,
                        length: 1,
                        uom: 1,
                        attachments: 1,
                        createdAt: 1,
                        updatedAt: 1,
                        image: 1,
                        sku: 1,
                        serialized: 1,
                        type: 1,
                        status: 1,
                        maxQuantity: 1,
                        minQuantity: 1,
                        createdBy: 1,
                        updatedBy: 1,
                        quantity: 1,
                        notes: 1,
                        price: "$pricing",
                        serializedProducts: "$serializedProducts",
                    },
                },
            ]);
            if (productDetails.image) {
                [productDetails.image] = await getAllAttachmentsRelatedToProduct([
                    productDetails.image,
                ]);
            }
            return productDetails;
        } catch (error) {
            console.log(error);
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    }
};
