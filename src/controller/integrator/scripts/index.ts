import { getAllJetbuiltProjects, getJetbuiltProjectItems, getJetbuiltPurchaseOrderById, getJetbuiltPurchaseOrders, processProjectItemToDb, processProjectToDb, processPurchaseOrderToDb } from "./functions/jetbuilt/index.ts";

import { LineItem } from "../../../interfaces/jetbuilt/projectItems.response.ts";
import axios, { AxiosError } from "axios";
import { ExternalIntegratorAuditLog } from "../../../models/externalIntegratorAuditLog.ts";
import { PurchaseOrder } from "../../../models/purchaseOrder.ts";
import { ulid } from "ulid";
import { IProjectLineItemLookup, ProjectProduct } from "../../../models/projectProduct.ts";
import { Project } from "../../../models/project.ts";
import { ProductDocument } from "../../../models/product.ts";

export async function saveAllJetbuiltProjectsIntoDb() {
    const jetbuiltProjects = await getAllJetbuiltProjects();
    console.log(`<< ${jetbuiltProjects.length} projects pulled`);

    // Create/update projects
    console.log("-- updating owner, client data");
    for (let index = 0; index < jetbuiltProjects.length; index++) {
        try {
            const element = jetbuiltProjects[index];
            await processProjectToDb(element);
        } catch (err: any) {
            console.log("*** error *** \n");
            console.log(err instanceof AxiosError ? err.response?.status : "");
            console.log(err instanceof AxiosError ? err.response?.statusText : "");
            console.log(err instanceof AxiosError ? err.response?.data : err);

            if (!axios.isAxiosError(err)) {
                const log = new ExternalIntegratorAuditLog({
                    success: false,
                    error: {
                        err: `${err.message}\n\n${err.stack}`
                    },
                    type: `PULL_PROJECTS:PROJECT ID ${jetbuiltProjects[index].id}`
                })

                await log.save();
            }
        }
    }
    console.log(`\n***${jetbuiltProjects.length} projects updated***\n`)
}

export async function saveProjectItemsIntoDb() {
    // collect all project items for projects stored in db
    const projectsInDb = await Project.find({}, { metadata: 1, uuid: 1 });

    let batSize = 1;
    let projectItems: LineItem[] = [];
    // for (let i = 0; i < 100; i += batSize) {
    for (let i = 0; i < projectsInDb.length; i += batSize) {
        try {
            const project = projectsInDb[i];
            const { metadata } = project;
            const jetbuiltProjectId = metadata?.external_id;
            if (!jetbuiltProjectId) {
                const log = new ExternalIntegratorAuditLog({
                    success: false,
                    error: {
                        err: `Missing project external ID; PROJECT UUID:${project.uuid}`
                    },
                    type: `PULL_PROJECT_ITEMS:PROJECT EXTERNAL ID ${projectsInDb[i].metadata?.external_id}`
                })

                await log.save();

                continue;
            }

            projectItems = await getJetbuiltProjectItems(String(jetbuiltProjectId));
            console.log(`<< i:${i} PROJECT_ID:${jetbuiltProjectId} ${projectItems.length} project items pulled`);

            let calls_arr = [];
            for (let index = 0; index < projectItems.length; index++) {
                const { quantity, notes, external_notes, quantity_per_room, quantity_per_bundle, discount } = projectItems[index];
                const saved_product: ProductDocument = await processProjectItemToDb(projectItems[index]);

                calls_arr.push(ProjectProduct.findOneAndUpdate({ project: project.uuid, product: saved_product.uuid }, {
                    $set: {
                        project: project.uuid as string,
                        product: saved_product.uuid as string,
                        quantity: Number(quantity),
                        quantity_per_room: Number(quantity_per_room),
                        quantity_per_bundle: Number(quantity_per_bundle),
                        notes,
                        external_notes,
                        room: saved_product.room,
                        system: saved_product.system,
                        pricing: saved_product.price,
                        discount: Number(discount)
                    },
                    $setOnInsert: { uuid: ulid(), allocated: 0 }
                }, { upsert: true, new: true }))
            }
            await Promise.all(calls_arr);

            console.log(`Saved/updated ${projectItems.length} project items for project id: ${jetbuiltProjectId}\n`);
        } catch (err: any) {
            console.log("*** error *** \n");
            console.log(err instanceof AxiosError ? err.response?.status : "");
            console.log(err instanceof AxiosError ? err.response?.statusText : "");
            console.log(err instanceof AxiosError ? err.response?.data : err);

            if (!axios.isAxiosError(err)) {
                const log = new ExternalIntegratorAuditLog({
                    success: false,
                    error: {
                        err: `${err.message}\n\n${err.stack}`
                    },
                    type: `PULL_PROJECT_ITEMS:PROJECT EXTERNAL ID ${projectsInDb[i].metadata?.external_id}`
                })

                await log.save();
            }
        }

    }

    console.log(`\n***projects items updated***\n`)
}

export async function saveAllJetbuiltPurchaseOrdersIntoDb() {
    const jetbuiltPurchaseOrders = await getJetbuiltPurchaseOrders();
    console.log(`<< ${jetbuiltPurchaseOrders.length} purchase orders pulled`);

    // Create purchase orders
    console.log("-- seeding purchase orders");
    let proms = [];
    for (let index = 0; index < jetbuiltPurchaseOrders.length; index++) {
        const id = jetbuiltPurchaseOrders[index].id;
        proms.push(PurchaseOrder.findOneAndUpdate({ metadata: { external_id: String(id) } }, {
            $setOnInsert: { uuid: ulid() }
        }, { upsert: true }));
    }
    await Promise.all(proms);

    // Update purchase orders with data
    console.log("-- updating purchase orders data");
    const allPurchaseOrdersInDb = await PurchaseOrder.find({}, { metadata: 1 });
    // for (let index = 0; index < 100; index++) {
    for (let index = 0; index < allPurchaseOrdersInDb.length; index++) {
        try {
            const id = allPurchaseOrdersInDb[index].metadata?.external_id as string;
            if (!id) {
                const log = new ExternalIntegratorAuditLog({
                    success: false,
                    error: {
                        err: `Missing purchase order external ID; PROJECT UUID:${allPurchaseOrdersInDb[index].uuid}`
                    },
                    type: `PULL_PURCHASE_ORDERS:PO EXRTERNAL ID ${jetbuiltPurchaseOrders[index].id}`
                })

                await log.save();

                continue;
            }

            const element = await getJetbuiltPurchaseOrderById(id);
            await processPurchaseOrderToDb(element);
        } catch (err: any) {
            console.log("*** error *** \n");
            console.log(err instanceof AxiosError ? err.response?.status : "");
            console.log(err instanceof AxiosError ? err.response?.statusText : "");
            console.log(err instanceof AxiosError ? err.response?.data : err);

            if (!axios.isAxiosError(err)) {
                const log = new ExternalIntegratorAuditLog({
                    success: false,
                    error: {
                        err: `${err.message}\n\n${err.stack}`
                    },
                    type: `PULL_PURCHASE_ORDERS:PO EXTERNAL ID ${jetbuiltPurchaseOrders[index].id}`
                })

                await log.save();
            }
        }
    }
    console.log(`\n***${jetbuiltPurchaseOrders.length} purchase orders updated***\n`)
}