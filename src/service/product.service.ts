
import { ReasonPhrases, StatusCodes } from "http-status-codes"
import { Attachment, AttachmentSchema } from "../models/attachment.ts"
import { Product, ProductDocument } from "../models/product.ts"
import { LocationProduct } from "../models/locationProduct.ts"
import { Location } from "../models/locations.ts"
import { VendorProduct } from "../models/vendorProduct.ts"
import { GraphQLError } from "graphql"
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { SerializedProduct } from "../models/serializedProduct.ts"
import { ulid } from "ulid"
import { ReceiveStockType, RoleStatus } from "../config/common/status.ts"
import { ProjectProduct } from "../models/projectProduct.ts"
import { IPricing, PricingModel } from "../models/pricing.ts";
import { purchaseOrderProduct } from "../models/purchaseOrderProduct.ts"
import { ReceiveStockTracking } from "../models/receiveStockTracking.ts"

interface VendorData {
    id: string;
    price: number;
}


interface TrackData {
    product: string
    quantity: number
    fromLocation: string
    toLocation: string
    deleteSerialNumbers: boolean
    serialNumbers: string[]
}

interface AllocatedDataArray {
    product: string
    allocated: number
}


type UpdateProductSequenceInput = {
    uuid: string;
    fromLocation: string;
    toLocation: string;
    serialized: boolean;
    quantity: number;
    deleteSerialNumbers: boolean;
    serialNumbers: string[];
};

const client = new S3Client({
    region: process.env.AWS_DEFAULT_REGION ?? "us-east-2",

    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export const associateProductWithAttachment = async (
    product: ProductDocument,
    attachment: AttachmentSchema
) => {
    const productAvail = await Product.findOne({ uuid: product?.uuid }).lean();
    if (!productAvail) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND },
            },
        });
    }
    const attachmentInfo = await Attachment.findOne({
        uuid: attachment?.uuid,
    }).lean();
    if (!attachmentInfo) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND },
            },
        });
    }
    // private files
    const getObjSignedUrl = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME ?? "test-doc-bucket-bala",
        Key: `test/${attachment?.uuid}`,
        ResponseExpires: new Date(Date.now() + 1000 * 60 * 60),
    });

    const attachmentPresignedUrl = await client.send(getObjSignedUrl);
    console.log(attachmentPresignedUrl);
    return attachmentPresignedUrl;
};

export const getAllAttachmentsRelatedToProduct = async (uuids: String[]) => {
    try {
        const attachmentUrlList = await getAttachments(uuids);
        return attachmentUrlList;
    } catch (error: any) {
        console.error(error);
        throw new Error(error?.message as string);
    }
};

export const getFileExtension = (filename: string): string => {
    if (filename.indexOf(".") === -1) {
        return "";
    }

    const parts = filename.split(".");
    return parts[parts.length - 1];
};

export const getAttachments = async (uuids: String[]) => {
    try {
        const attachments = await Attachment.find({ uuid: { $in: uuids } }).lean();
        if (!attachments) {
            throw new Error("[ServerError]: Attachments not available for " + uuids);
        }
        const getSignedUrlsPromise = [];
        for (const attachment of attachments) {
            const getObjSignedUrl = new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME ?? "test-doc-bucket-bala",
                Key: `test/${attachment?.uuid}`,
            });
            const attachmentPresignedUrl = await getSignedUrl(
                client,
                getObjSignedUrl,
                { expiresIn: 3600 }
            );
            getSignedUrlsPromise.push({
                url: attachmentPresignedUrl,
                uuid: attachment?.uuid,
                name: attachment?.name,
                description: attachment?.description,
                type: getFileExtension(attachment?.name),
            });
        }
        let attachmentUrls: any[] = await Promise.allSettled(getSignedUrlsPromise);
        attachmentUrls = attachmentUrls.map(
            (attachmentUrl): any => attachmentUrl?.value as string
        );
        return attachmentUrls;
    } catch (error: any) {
        console.error(error);
        throw new Error(error?.message as string);
    }
};

export const associateProductWithLocation = async (
    productId: string,
    locationId: string
) => {
    const productAvail = await Product.findOne({ uuid: productId }).lean();
    if (!productAvail) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND },
            },
        });
    }
    const locationAvail = await Location.findOne({ uuid: locationId }).lean();
    if (!locationAvail) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND },
            },
        });
    }
    const productLocationAssociation = new LocationProduct({
        product: productId,
        location: locationId,
    });
    const { uuid } = await productLocationAssociation.save();
    return uuid;
};

export const associateProductWithVendor = async (
    productId: string,
    vendors: VendorData[]
) => {
    // make multiple record for each vendorId
    const productAvail = await Product.findOne({ uuid: productId }).lean();
    if (!productAvail) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND },
            },
        });
    }

    const vendorProductAssociation = vendors.map((vendor) => {
        return {
            product: productId,
            vendor: vendor.id,
            price: vendor.price,
        };
    });

    const vendorProductAssociationList = await VendorProduct.insertMany(
        vendorProductAssociation
    );
    return vendorProductAssociationList.map(
        (vendorProductAssociation) => vendorProductAssociation.uuid
    );
};

export const serializeProduct = async (
    productId: string,
    number: string = ""
) => {
    const productAvail = await Product.findOne({ uuid: productId }).lean();
    if (!productAvail) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND },
            },
        });
    }
    number = number ?? ulid();
    const serializedProduct = new SerializedProduct({
        product: productId,
        number,
        status: RoleStatus.Active
    })
    const { uuid } = await serializedProduct.save()
    return uuid
}

export const changeProjectProductAllocate = async (trackData: TrackData[]) => {
    const projectProductList = await ProjectProduct.find({ product: { $in: trackData.map((track) => track.product) } }).lean()
    if (!projectProductList) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND }
            }
        })
    }
    for (const track of trackData) {
        const projectProduct = projectProductList.find((projectProduct) => projectProduct.product === track.product)
        if (projectProduct) {
            const updatedProjectProduct = await ProjectProduct.findOneAndUpdate({ uuid: projectProduct.uuid }, {
                $inc: {
                    allocated: track.quantity
                },
                product_location: track.fromLocation
            }, { upsert: true })
        }
    }

    // return the allocated product uuids with allocated quantity
    return projectProductList.map((projectProduct) => {
        return {
            product: projectProduct.product,
            allocated: projectProduct.allocated
        }
    })
}


export const createPricingInfoForProduct = async (
    pricingInput: IPricing,
    userId: string,
    productName: string
) => {
    if (!pricingInput) {
        throw new GraphQLError(
            ReasonPhrases.BAD_REQUEST + " pricing for the product is not found",
            {
                extensions: {
                    code: StatusCodes.BAD_REQUEST,
                    http: { status: StatusCodes.BAD_REQUEST },
                },
            }
        );
    }
    let newPricing = new PricingModel({
        ...pricingInput,
        createdBy: userId,
        updatedBy: userId,
        status: "active",
        name: productName,
    });
    newPricing = await newPricing.save();
    return newPricing.uuid;
};

export const createOrDeleteSerializedProducts = async (
    product: UpdateProductSequenceInput,
    userId: string
) => {
    // add the data for removeSerialNumbers again
    if (product?.deleteSerialNumbers) {
        await SerializedProduct.updateMany(
            {
                number: { $in: product?.serialNumbers },
                ...(product?.fromLocation && {
                    locationId: product?.fromLocation
                }),
                ...(product?.toLocation && {
                    locationId: product?.toLocation
                })
            },
            {
                deleted: true,
                deletedAt: new Date().toISOString(),
                deletedBy: userId,
                deletedReason: "Removed from location",
                deletedNote: "Removed from location",
            }
        );
        return;
    }

    const serializedProductData = product?.serialNumbers?.map(
        (serialNumber: string) => {
            return {
                product: product?.uuid,
                locationId: product?.toLocation,
                number: serialNumber,
                status: "active",
                createdBy: userId,
                updatedBy: userId,
            };
        }
    );
    return await SerializedProduct.create(serializedProductData);
};

export const updateLocationProductInSequence = async (
    product: UpdateProductSequenceInput,
    userId: string
) => {
    if (product?.fromLocation) {
        const existingProductFromLocation = await LocationProduct.findOneAndUpdate(
            { product: product?.uuid, location: product?.fromLocation },
            {
                $inc: { quantity: -product?.quantity },
            }
        );
        if (!existingProductFromLocation) {
            throw new GraphQLError(
                ReasonPhrases.NOT_FOUND +
                " Product not found for location " +
                product?.fromLocation,
                {
                    extensions: {
                        code: StatusCodes.NOT_FOUND,
                        http: { status: StatusCodes.NOT_FOUND },
                    },
                }
            );
        }
    }

    const existingProductInLocation = await LocationProduct.findOneAndUpdate(
        { product: product?.uuid, location: product?.toLocation },
        {
            $inc: { quantity: product?.quantity },
        }
    );
    if (!existingProductInLocation?.uuid) {
        const initAddProductInLocation = new LocationProduct({
            product: product?.uuid,
            location: product?.toLocation,
            quantity: product?.quantity,
            createdBy: userId,
            updatedBy: userId,
            status: "active",
        });
        await initAddProductInLocation.save();
    }
};

export const checkForLocations = async (
    product: UpdateProductSequenceInput
) => {
    const locations: string[] = [];
    if (product?.fromLocation) {
        locations.push(product?.fromLocation);
    }
    if (product?.toLocation) {
        locations.push(product?.toLocation);
    }


    const location = await Location.find({
        uuid: { $in: locations },
    }).lean();

    if (!Array.isArray(location) || location.length === 0) {
        throw new Error(
            " Locations not found for uuid " +
            product?.fromLocation +
            " and " +
            product.toLocation
        );
    }
};

export const associateProjectWithSerializedProduct = async (type: string, projectId: string, track: TrackData[]) => {
    const updatedUUIDs: string[] = [];

    try {
        for (const item of track) {
            for (const serialNumber of item.serialNumbers) {
                // Find the document with the given serial number
                const serializedProduct = await SerializedProduct.findOne({ uuid: serialNumber });

                if (serializedProduct) {
                    // Update the document with the projectId
                    if (type === "allocate_stock") {
                        serializedProduct.project = projectId;
                    } else if (type === "deallocate_stock") {
                        serializedProduct.project = "";
                    }
                    serializedProduct.locationId = item.fromLocation;
                    await serializedProduct.save();
                    // Add the uuid to the array of updated UUIDs
                    updatedUUIDs.push(serializedProduct.uuid);
                } else {
                    console.warn(`Serialized product with number ${serialNumber} not found`);
                }
            }
        }
    } catch (error) {
        console.error('Error associating project with serialized products:', error);
        throw error; // Optionally rethrow the error
    }

    return updatedUUIDs;
}

export const updateProductUsedWithAllocate = async (trackData: TrackData[], allocatedDataArray: AllocatedDataArray[]) => {
    // get the track list and find all the products in Product 
    const productAvail = await Product.find({ uuid: { $in: trackData.map((track) => track.product) } }).lean();
    console.log("productAvail: ", productAvail)

    if (!productAvail) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND }
            }
        })
    }

    for (const track of trackData) {
        const product = productAvail.find((product) => product.uuid === track.product)
        if (product) {
            if (!product.onUsed) {
                const allocatedProduct = allocatedDataArray.find((allocatedProduct) => allocatedProduct.product === product.uuid)
                if (allocatedProduct) {
                    product.onUsed = allocatedProduct.allocated
                }
            }

            const updatedProduct = await Product.findOneAndUpdate({ uuid: product.uuid }, {
                $inc: {
                    onUsed: track.quantity
                }
            }, { upsert: true })
            console.log("updatedProduct: ", updatedProduct)
        }
    }

    return productAvail.map((product) => product.uuid)
}

export const updateLocationProductDataWithAllocate = async (trackData: TrackData[]) => {
    const locationProductList = await LocationProduct.find({ product: { $in: trackData.map((track) => track.product) } }).lean()
    console.log("locationProductList: ", locationProductList)
    if (!locationProductList) {
        throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
            extensions: {
                code: StatusCodes.NOT_FOUND,
                http: { status: StatusCodes.NOT_FOUND }
            }
        })
    }
    for (const track of trackData) {
        const locationProduct = locationProductList.find((locationProduct) => locationProduct.product === track.product && locationProduct.location === track.fromLocation)
        console.log("locationProduct: ", locationProduct)
        if (locationProduct) {
            const updatedLocationProduct = await LocationProduct.findOneAndUpdate({ uuid: locationProduct.uuid }, {
                $inc: {
                    onUsed: track.quantity
                }
            }, { upsert: true })
        }
    }
    return locationProductList.map((locationProduct) => locationProduct.uuid)
}

export const updateReceivedItemsQty = async (products: {
    uuid: string
    quantity: number
    fromLocation: string
    toLocation: string
    deleteSerialNumbers?: boolean
    serialNumbers?: string[]
    serialized?: boolean
}[], note?: string, purchaseOrderId?: string) => {

    for (let index = 0; index < products.length; index++) {
        const product = products[index];

        let po_product_uuid;
        if (purchaseOrderId) {
            // increment the purchase order item received_quantity
            const updated_po_product = await purchaseOrderProduct.findOneAndUpdate({ purchase_order: purchaseOrderId, product: product.uuid },
                { $inc: { received_quantity: product.quantity } }
            )
            po_product_uuid = updated_po_product?.uuid;
        }

        // increment the location product item received_quantity
        const updated_location_product = await LocationProduct.findOneAndUpdate(
            { location: product.toLocation, product: product.uuid },
            { $inc: { quantity: product.quantity } }
        );

        // add receive stock tracking entry
        const receiveOrder = new ReceiveStockTracking({
            purchase_order_product: po_product_uuid,
            location_product: updated_location_product?.uuid,
            note,
            type: purchaseOrderId ? ReceiveStockType.PURCHASE_ORDER : ReceiveStockType.MANUAL_RECEIVE,
            received_quantity: product.quantity,
            product: product.uuid,
            location: product.toLocation
        })

        await receiveOrder.save();
    }
}
