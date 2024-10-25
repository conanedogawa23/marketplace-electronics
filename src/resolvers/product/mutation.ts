import { startSession } from "mongoose";
import { Category, type CategoryDocument } from "../../models/category.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import {
    Manufacturer,
    type ManufacturerDocument,
} from "../../models/manufacturer.ts";
import { Uom, type UomDocument } from "../../models/uom.ts";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Product, ProductDocument } from "../../models/product.ts";
import { PricingDocument, PricingModel } from "../../models/pricing.ts";
import { Attachment } from "../../models/attachment.ts";
import {
    serializeProduct,
    associateProductWithVendor,
    createPricingInfoForProduct,
    createOrDeleteSerializedProducts,
    updateLocationProductInSequence,
    checkForLocations,
    updateReceivedItemsQty,
} from "../../service/product.service.ts";
import {
    SerializedProduct,
    SerializedProductInterface,
} from "../../models/serializedProduct.ts";
import { Location } from "../../models/locations.ts";
import { LocationProduct } from "../../models/locationProduct.ts";
import { ActivityLog, ReasonLog } from "../../models/activityLogs.ts";
import { ActivityLogType, RoleStatus } from "../../config/common/status.ts";
import {
    attachmentLookupAggregateQuery,
    categoryLookupAggregateQuery,
    locationProductLookupAggregateQuery,
    manufacturerLookupAggregateQuery,
    pricingLookupAggregateQuery,
    serializedProductLookupAggregateQuery,
    uomLookupAggregateQuery,
} from "./lookupQueries.ts";

export const productMutations: MutationResolvers = {
    createProduct: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n 
                args: ${args},\n 
                context: ${context},\n 
                info ${info}\n
            `);
            const { product } = args;
            const availableCategory = Category.findOne({
                uuid: product?.category,
            }).lean();
            const availManufacturer = Manufacturer.findOne({
                uuid: product?.manufacturer,
            }).lean();
            const availUomValue = Uom.findOne({ uuid: product?.uom }).lean();
            if (!!product?.attachments?.length || product?.image) {
                const attachments = product?.image
                    ? [...product.attachments, product.image]
                    : product.attachments;
                let availAttachments = await Attachment.find({
                    uuid: { $in: attachments },
                }).lean();
                if (
                    !availAttachments?.length ||
                    availAttachments?.length !== attachments?.length
                ) {
                    throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                        extensions: {
                            code: StatusCodes.NOT_FOUND,
                            http: { status: StatusCodes.NOT_FOUND },
                        },
                    });
                }
                console.log(
                    "attachements available for product with SKU " + product?.sku
                );
            }
            const [category, manufacturer, uom] = (await Promise.allSettled([
                availableCategory,
                availManufacturer,
                availUomValue,
            ])) as unknown as [CategoryDocument, ManufacturerDocument, UomDocument];
            if (!category || !manufacturer || !uom) {
                let errorMsg = "";
                if (!category) errorMsg += "Category not found. ";
                if (!manufacturer) errorMsg += "Manufacturer not found. ";
                if (!uom) errorMsg += "UOM not found.";
                throw new GraphQLError(ReasonPhrases.NOT_FOUND + ` ${errorMsg}`, {
                    extensions: {
                        code: StatusCodes.NOT_FOUND,
                        http: { status: StatusCodes.NOT_FOUND },
                    },
                });
            }
            const priceId = await createPricingInfoForProduct(
                product?.price,
                context?.user?.uuid,
                product?.name
            );
            delete product?.price;
            const newProduct = new Product({
                ...product,
                price: priceId,
                createdBy: context?.user?.uuid,
                updatedBy: context?.user?.uuid,
                status: RoleStatus.Active,
            });

            const newProductValue = await newProduct.save();
            await associateProductWithVendor(
                newProductValue.uuid as string,
                product?.vendors
            );
            return newProductValue.toObject();
        } catch (error: any) {
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST + error?.message, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    updateProduct: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `);
        const { product } = args;
        const productRelationsCheck = [];

        const availableProduct = await Product.findOne({
            uuid: product?.uuid,
        }).lean();
        const uuid = availableProduct?.uuid;

        if (product?.category) {
            productRelationsCheck.push(
                Category.findOne({ uuid: product?.category }).lean()
            );
            delete product?.category;
        } else productRelationsCheck.push("");

        if (product?.manufacturer) {
            productRelationsCheck.push(
                Manufacturer.findOne({ uuid: product?.manufacturer }).lean()
            );
            delete product?.manufacturer;
        } else productRelationsCheck.push("");

        if (product?.uom) {
            productRelationsCheck.push(Uom.findOne({ uuid: product?.uom }).lean());
            delete product?.uom;
        } else productRelationsCheck.push("");

        if (product?.price) {
            productRelationsCheck.push(
                PricingModel.findOneAndUpdate(
                    { uuid: product?.price.uuid },
                    { $set: { ...product.price } },
                    { upsert: true, new: true }
                )
            );
            delete product?.price;
        } else productRelationsCheck.push("");

        const [category, manufacturer, uom, price] = (await Promise.allSettled(
            productRelationsCheck
        )) as unknown as [
                { status: "fulfilled" | "rejected"; value: CategoryDocument | undefined },
                {
                    status: "fulfilled" | "rejected";
                    value: ManufacturerDocument | undefined;
                },
                { status: "fulfilled" | "rejected"; value: UomDocument | undefined },
                { status: "fulfilled" | "rejected"; value: PricingDocument | undefined }
            ];

        delete product?._id;
        delete product?.createdAt;
        delete product?.updatedAt;
        delete product?.deletedAt;
        delete product?.uuid;

        console.log(category, manufacturer, uom, price);

        const updateProduct = (await Product.findOneAndUpdate(
            { uuid },
            {
                ...product,
                ...(category?.value && { category: category?.value?.uuid }),
                ...(manufacturer?.value && { manufacturer: manufacturer?.value?.uuid }),
                ...(uom?.value && { uom: uom?.value?.uuid }),
                ...(price?.value && { price: price?.value?.uuid }),
            },
            { upsert: true, new: true }
        )) as unknown as ProductDocument;

        const [productDetails] = await Product.aggregate([
            {
                $match: {
                    uuid: updateProduct.uuid,
                },
            },
            categoryLookupAggregateQuery,
            manufacturerLookupAggregateQuery,
            uomLookupAggregateQuery,
            attachmentLookupAggregateQuery,
            pricingLookupAggregateQuery,
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
            serializedProductLookupAggregateQuery,
            locationProductLookupAggregateQuery,
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
                    vendors: 1,
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
                    price: "$pricing",
                    serializedProducts: "$serializedProducts",
                    location: "$location",
                },
            },
        ]);

        return productDetails;
    },
    deleteProduct: async (parent: any, args: any, context: any, info: any) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info ${info}\n
        `);
        const { uuid } = args;
        const productValue = await Product.findOne({ uuid }).lean();
        if (!productValue) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND },
                },
            });
        }
        const deleteProduct = (await Product.findOneAndUpdate(
            { uuid },
            {
                deleted: true,
                deletedAt: new Date().toISOString(),
                deletedBy: context.user?.uuid,
                deletedReason: args.reason,
                deletedNote: args.note,
            },
            { upsert: true }
        )) as unknown as ProductDocument;

        return deleteProduct.toObject();
    },
    createSerializedProduct: async (
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
        const { serializedProduct } = args;
        const serializedProductId = await serializeProduct(
            serializedProduct?.product,
            serializedProduct?.number
        );
        const serializedProductData = (await SerializedProduct.findOne({
            uuid: serializedProductId,
        }).lean()) as unknown as SerializedProductInterface;
        return serializedProductData;
    },
    updateProductSequence: async (
        parent: any,
        args: any,
        context: any,
        info: any
    ) => {
        const session = await startSession();
        session.startTransaction();

        const { products: productInfo } = args;
        const {
            status,
            type,
            activityId,
            description,
            name,
            note,
            warehouse,
            destinationWarehouse,
            activityReason,
            products,
            purchaseOrderId
        } = productInfo;
        const activityTrackValues = products.map((product: any) => {
            return {
                product: product?.uuid,
                quantity: product?.quantity,
                fromLocation: product?.fromLocation,
                toLocation: product?.toLocation,
                deleteSerialNumbers: product?.deleteSerialNumbers,
                serialNumbers: product?.serialNumbers,
                serialized: product?.serialized,
            };
        });
        const newActivityLog = new ActivityLog({
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: status || "active",
            type: type || ActivityLogType.ADJUST_STOCK,
            track: activityTrackValues,
            activityId,
            activityReason,
            description,
            name,
            note,
            warehouse,
            destinationWarehouse,
        });
        try {
            console.log(
                `
                parent: ${parent},\n,
                args: ${args},\n,
                context: ${context},\n,
                info: ${info}\n
                `
            );
            const allProductIds = products.map((product: any) => product?.uuid);
            if (!allProductIds?.length) {
                throw new Error("Product uuids are required");
            }
            const allProducts = await Product.find({
                uuid: { $in: allProductIds },
            }).lean();
            if (!allProducts?.length || allProducts?.length !== products?.length) {
                throw new Error(` Products not found for uuids ${JSON.stringify(
                    allProductIds || []
                )}`);
            }
            let processPendingProducts = [...allProducts];

            for (const [index, product] of products.entries()) {
                const availableProduct = processPendingProducts[index];

                if (!availableProduct) {
                    newActivityLog.status = "failed";
                    newActivityLog.note = "Product not found";
                    await newActivityLog.save();
                    throw new Error(" Product not found for uuid " + product?.uuid);
                }

                const updateCondition = {
                    $inc: {
                        quantity: product?.quantity,
                    },
                    ...(product?.serialized && {
                        serialized: true,
                    }),
                    ...((type === ActivityLogType.ADJUST_STOCK || type === ActivityLogType.RECEIVE_STOCK) && { adjusted: true }),
                };
                await Product.updateOne({ uuid: product?.uuid }, updateCondition, {
                    upsert: true,
                });
                availableProduct.serialized = !!product?.serialNumbers?.length;

                await checkForLocations(product);

                await updateLocationProductInSequence(product, context?.user?.uuid);
                // Product if not available in location then create a new location product
                if (!availableProduct?.serialized) {
                    continue;
                }
                await createOrDeleteSerializedProducts(product, context?.user?.uuid);
            }
            await newActivityLog.save();

            if (type === ActivityLogType.RECEIVE_STOCK) {
                await updateReceivedItemsQty(products, note, purchaseOrderId)
            }

            await session.commitTransaction();
            await session.endSession();
            return "Updated the Products";
        } catch (error: any) {
            newActivityLog.status = "failed";
            newActivityLog.note = "Product not found in Location";
            await newActivityLog.save();
            await session.abortTransaction();
            await session.endSession();
            throw new GraphQLError(ReasonPhrases.BAD_REQUEST + error?.message, {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            });
        }
    },
    createReasonLog: async (parent: any, args: any, context: any, info: any) => {
        try {
            console.log(`
                parent: ${parent},\n
                args: ${JSON.stringify(args)},\n
                context: ${context},\n
                info ${info}\n
            `)
            const { reasonLog } = args;
            const newReasonLog = new ReasonLog({
                ...reasonLog,
                createdBy: context?.user?.uuid,
                updatedBy: context?.user?.uuid,
                status: RoleStatus.Active
            });
            const newReasonLogValue = await newReasonLog.save();
            return newReasonLogValue.toObject();
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
