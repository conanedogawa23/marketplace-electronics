import { toDataURL } from 'qrcode';
import { DateTime } from "luxon";
import { createWriteStream } from "node:fs";
import { GraphQLError } from "graphql";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

import { Inventory } from "../../models/inventory.ts";
import { MutationResolvers } from "../../generated/graphql.ts";
import { Manufacturer } from "../../models/manufacturer.ts";
import { Category } from "../../models/category.ts";
import { Vendor } from "../../models/vendor.ts";

export const inventoryMutations: MutationResolvers = {
    createInventory: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        const [manufacturer, category, vendors] = await Promise.allSettled([
            Manufacturer.findOne({uuid: args?.inventory?.manufacturer}),
            Category.findOne({uuid: args?.inventory?.category}),
            Vendor.find({uuid: { $in: args?.inventory?.vendors }}),
        ])
        if(!manufacturer || !category || !vendors) {
            throw new GraphQLError(ReasonPhrases.NOT_FOUND, {
                extensions: {
                    code: StatusCodes.NOT_FOUND,
                    http: { status: StatusCodes.NOT_FOUND }
                }
            })
        }
        const inventoryPayload = new Inventory({
            ...args?.inventory,
            createdBy: context?.user?.uuid,
            updatedBy: context?.user?.uuid,
            status: 'active',
        });
        const newInventory = await inventoryPayload.save();
        return newInventory.toObject();
    },
    updateInventory: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        return await Inventory.findOneAndUpdate({ uuid: args?.inventory?.uuid }, args?.inventory, { upsert: true });
    },
    deleteInventory: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        return await Inventory.findOneAndUpdate({ uuid: args?.inventory?.uuid }, { 
            deleted: true, 
            deletedAt: DateTime.now(), 
            deletedReason: args?.inventory?.reason,
            deletedNote: args?.inventory?.note,
        }, { upsert: true });
    },
    generateQRCode: async (parent, args, context, info) => {
        console.log(`
            parent: ${parent},\n 
            args: ${args},\n 
            context: ${context},\n 
            info: ${info}\n
        `);
        const appBaseUrl = process.env.APP_BASE_URL
        const qrCodeObject = args?.qrInput?.map((item: any) => {
             if(item?.serializeIds?.length > 0) {
                const serializeIdsData = item?.serializeIds?.map((serial: any) => {
                    return {
                        url: `${appBaseUrl}/item-details/${item?.uuid}/${serial?.id}`,
                        id: serial?.id,
                        uuid: item?.uuid,
                        serialNo: serial?.id,
                        sku: item?.sku,
                        type: item?.type || "undefined",
                        name: item?.name
                     }
                })
                return serializeIdsData
             }else{
               return {
                    url: `${appBaseUrl}/item-details/${item.uuid}`,
                    id: item?.uuid,
                    uuid: item?.uuid,
                    sku: item?.sku,
                    serialNo: null,
                    type: item?.type || "undefined",
                    name: item?.name
                 }
             }
        })
        const QrCodes = qrCodeObject?.flatMap((item: any) => item)
        return QrCodes.map(async (qrCode: any) => {
            const qrCodeData = await toDataURL(JSON.stringify(qrCode));
            return {
                qrCode: qrCodeData,
                uuid: qrCode?.uuid,
                sku: qrCode?.sku,
                serialNo: qrCode?.serialNo,
                type: qrCode?.type,
                name: qrCode?.name
            };
        })
    },
    uploadInventoryFile: async (parent, { file }) => {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();
        const path = `./uploads/${filename}`;
        await new Promise((resolve, reject) =>
            stream
                .pipe(createWriteStream(path))
                .on("finish", resolve)
                .on("error", (error: any) => {
                    console.log(error);
                    reject(error);
                })
        );
        return path;
    }
}