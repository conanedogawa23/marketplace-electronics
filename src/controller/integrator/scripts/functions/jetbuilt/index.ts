import JetBuiltApi from "../../../../../service/jetbuilt.service.ts";
import { Project as ProjectInterface } from "../../../../../interfaces/jetbuilt/projects.response.ts";
import { Project, IProject } from "../../../../../models/project.ts";
import { LineItem } from "../../../../../interfaces/jetbuilt/projectItems.response.ts";
import { Product, IProduct } from "../../../../../models/product.ts";
import { Owner, IOwner } from "../../../../../models/owner.ts";
import { Client, IClient } from "../../../../../models/client.ts";
import { Manufacturer, IManufacturer } from "../../../../../models/manufacturer.ts";
import { PricingModel as Pricing, IPricing } from "../../../../../models/pricing.ts";
import { Category, ICategory } from "../../../../../models/category.ts";
import { System, ISystem } from "../../../../../models/system.ts";
import { Room, IRoom } from "../../../../../models/room.ts";
import { ulid } from "ulid";
import { PurchaseOrderObject } from "../../../../../interfaces/jetbuilt/purchaseOrders.response.ts";
import { IPurchasingSource, PurchasingSource } from "../../../../../models/purchasingSource.ts";
import { PurchasingSource as PurchasingSourceInterface } from "../../../../../interfaces/jetbuilt/purchasingSource.response.ts";
import { IPurchaseOrder, PurchaseOrder } from "../../../../../models/purchaseOrder.ts";
import { PurchaseOrder as PurchaseOrderInterface } from "../../../../../interfaces/jetbuilt/purchaseOrder.response.ts";
import { ExternalIntegratorAuditLog } from "../../../../../models/externalIntegratorAuditLog.ts";
import { purchaseOrderProduct, IPurchaseOrderLineItemsLookup } from "../../../../../models/purchaseOrderProduct.ts";
import { convertPriceObjectToDollars } from "../../../../../utils/index.ts";
import { IClientResponse, Subclient } from "../../../../../interfaces/jetbuilt/client.response.ts";

const jetbuilt = new JetBuiltApi(process.env.JETBUILT_BASE_URL as string, process.env.JETBUILT_API_KEY as string, process.env.JETBUILT_API_VERSION as string);

// Helpers

/* @@ 
   ___________ ________  ______     _______  _______________  ___  ____________
  / __/ ___/ // / __/  |/  / _ |   / __/ _ |/ ___/_  __/ __ \/ _ \/  _/ __/ __/
 _\ \/ /__/ _  / _// /|_/ / __ |  / _// __ / /__  / / / /_/ / , _// // _/_\ \  
/___/\___/_//_/___/_/  /_/_/ |_| /_/ /_/ |_\___/ /_/  \____/_/|_/___/___/___/  
                                                                                
@@ */

/* --- nested models --- */
export function createClientDocument(client: IClientResponse): IClient {
    const { id, primary_contact_first_name, primary_contact_last_name, primary_contact_email, address, city, country, state, zipcode, primary_contact_phone_number_1, primary_contact_phone_number_2, company_name } = client

    return {
        name: (primary_contact_first_name && primary_contact_last_name) ? `${primary_contact_first_name} ${primary_contact_last_name}` : (primary_contact_first_name || primary_contact_last_name),
        email: primary_contact_email,
        phone: primary_contact_phone_number_1 || primary_contact_phone_number_2,
        company_name,
        address: { address, zipcode, city, state, country },
        metadata: {
            external_id: String(id)
        }
    }
}

export function createSubClientDocument(client: Subclient): IClient {
    const { id, primary_contact_first_name, primary_contact_last_name, primary_contact_email, address, city, country, state, zipcode, primary_contact_phone_number_1, primary_contact_phone_number_2, company_name } = client

    return {
        name: (primary_contact_first_name && primary_contact_last_name) ? `${primary_contact_first_name} ${primary_contact_last_name}` : (primary_contact_first_name || primary_contact_last_name),
        email: primary_contact_email,
        phone: primary_contact_phone_number_1 || primary_contact_phone_number_2,
        type: "subclient",
        company_name,
        address: { address, zipcode, city, state, country },
        metadata: {
            external_id: String(id)
        }
    }
}

export function createCategoryDocument(product: LineItem): ICategory {
    const { kind } = product;

    return {
        name: kind,
        metadata: {
            external_id: kind
        }
    }
}

export function createManufacturerDocument(product: LineItem): IManufacturer {
    const { manufacturer_id, manufacturer_name } = product;

    return {
        name: manufacturer_name,
        metadata: {
            external_id: String(manufacturer_id)
        }
    }
}

export function createPricingDocument(product: LineItem): IPricing {

    const { id, manufacturer_name, model, msrp, mapp, cost, price, shipping_price, currency_iso, subtotal_equipment_price, subcontract_labor_cost, subcontract_labor_price, total_equipment_price, discount } = product;

    return {
        name: `${manufacturer_name} ${model}`,
        msrp: convertPriceObjectToDollars(msrp),
        mapp: convertPriceObjectToDollars(mapp),
        cost: convertPriceObjectToDollars(cost),
        price: convertPriceObjectToDollars(price),
        sell: convertPriceObjectToDollars(price),
        shippingCost: convertPriceObjectToDollars(shipping_price),
        shippingSell: convertPriceObjectToDollars(shipping_price),
        subtotal_equipment_price: convertPriceObjectToDollars(subtotal_equipment_price),
        subcontract_labor_cost: convertPriceObjectToDollars(subcontract_labor_cost),
        subcontract_labor_price: convertPriceObjectToDollars(subcontract_labor_price),
        total_equipment_price: convertPriceObjectToDollars(total_equipment_price),
        discount: Number(discount), currency_iso,
        metadata: {
            external_id: String(id)
        }
    }
}

export function createSystemDocument(product: LineItem): ISystem {
    const { system } = product;

    return {
        name: system.name,
        metadata: {
            external_id: String(system.id)
        }
    }
}

export function createRoomDocument(product: LineItem): IRoom {
    const { room } = product;

    return {
        name: room.name,
        quantity: room.quantity,
        metadata: {
            external_id: String(room.id)
        }
    }
}

export function createPurchasingSourceDocument(purchasingSource: PurchasingSourceInterface): IPurchasingSource {

    const { company_name, created_at, dealer_number, default_ship, email, first_name, id, last_name, phone, updated_at } = purchasingSource;

    const purchasing_source_doc = {
        company_name, dealer_number, default_ship, first_name, last_name, email, phone,
        metadata: {
            external_id: String(id),
            created_at, updated_at
        }
    }

    return purchasing_source_doc;
}


/* --- parent models --- */
export function createProjectDocument(project: ProjectInterface, client_uuid: string): IProject {
    const { name, short_description, custom_id, updated_at, stage, project_type, payment_schedule, sales_tax, labor_tax, total_margin, equipment_margin, equipment_total, labor_total, shipping_total, tax_total, total, address, city, state, zipcode, country, primary_contact, company_location, id } = project;

    const { id: company_location_id, name: company_location_name } = company_location;
    const { id: primary_contact_id } = primary_contact;

    const projectData: any = {
        custom_id, updated_at, stage, project_type, payment_schedule, sales_tax, labor_tax, total_margin, equipment_margin, equipment_total, labor_total, shipping_total, tax_total, total, address, city, state, zipcode, country,

        name, description: short_description || "",
        client: String(client_uuid),
        ...process.env.PLACEHOLDER_USER_UUID && { owner: process.env.PLACEHOLDER_USER_UUID },
        ...primary_contact_id && { primary_contact_id: String(primary_contact_id) },
        company_location_id: String(company_location_id),
        company_location_name,
        metadata: {
            external_id: String(id)
        }
    }

    return projectData;
}

export function createProjectItemDocument(product: LineItem, category_uuid: string, manufacturer_uuid: string, pricing_uuid: string, room_uuid: string, system_uuid: string): IProduct {
    const {
        id,
        short_description,
        quantity,
        quantity_per_room,
        notes,
        manufacturer_name,
        model
    } = product;

    const productData: IProduct = {
        name: `${manufacturer_name} ${model}`,
        description: short_description,
        tags: ["JETBUILT"],
        category: category_uuid,
        manufacturer: manufacturer_uuid,
        price: pricing_uuid,
        image: "",
        adjusted: false,
        sku: String(model) || "not_found",
        quantity, notes: notes || "", quantity_per_room,
        system: system_uuid,
        room: room_uuid,
        onUsed: 0,
        metadata: {
            external_id: String(id)
        }

    }

    return productData;
}

export function createPurchaseOrderDocument(purchaseOrder: PurchaseOrderObject, project_uuid: string, purchasing_source_uuid: string): IPurchaseOrder {

    const { id, custom_id, default_ship, notes, status, shipping_option, ship_name, ship_address } = purchaseOrder;

    const purchaseOrderDoc: IPurchaseOrder = {
        project: project_uuid,
        purchasingSource: purchasing_source_uuid,
        custom_id, default_ship, notes, status, shipping_option, ship_name, ship_address,
        metadata: {
            external_id: String(id)
        }
    }

    return purchaseOrderDoc;
}

/* @@ 
   ___  ___    ______  ___  _____________________  _  ______
  / _ \/ _ )  / __/ / / / |/ / ___/_  __/  _/ __ \/ |/ / __/
 / // / _  | / _// /_/ /    / /__  / / _/ // /_/ /    /\ \  
/____/____/ /_/  \____/_/|_/\___/ /_/ /___/\____/_/|_/___/  
                                                                                                               
@@ */

export async function saveNestedProjectItemFields(lineItem: LineItem) {
    let calls_arr = [];

    const category_doc = createCategoryDocument(lineItem);
    const manufacturer_doc = createManufacturerDocument(lineItem);
    const room_doc = createRoomDocument(lineItem);
    const system_doc = createSystemDocument(lineItem);
    const pricing_doc = createPricingDocument(lineItem);

    calls_arr.push(
        Category.findOneAndUpdate({ "metadata.external_id": String(lineItem.kind) }, {
            $set: category_doc,
            $setOnInsert: { uuid: ulid() }
        }, {
            upsert: true, new: true
        }),
        Manufacturer.findOneAndUpdate({ "metadata.external_id": String(lineItem.manufacturer_id) }, {
            $set: manufacturer_doc,
            $setOnInsert: { uuid: ulid() }
        }, {
            upsert: true, new: true
        }),
        Room.findOneAndUpdate({ "metadata.external_id": String(lineItem.room.id) }, {
            $set: room_doc,
            $setOnInsert: { uuid: ulid() }
        }, {
            upsert: true, new: true
        }),
        System.findOneAndUpdate({ "metadata.external_id": String(lineItem.system.id) }, {
            $set: system_doc,
            $setOnInsert: { uuid: ulid() }
        }, {
            upsert: true, new: true
        }),
        Pricing.findOneAndUpdate({ "metadata.external_id": String(lineItem.id), "name": pricing_doc.name }, {
            $set: pricing_doc,
            $setOnInsert: { uuid: ulid() }
        }, {
            upsert: true, new: true
        })
    )

    return Promise
        .all(calls_arr)
        .then((data) => {

            const category_uuid = (data[0]).uuid;
            const manufacturer_uuid = (data[1]).uuid;
            const room_uuid = (data[2]).uuid;
            const system_uuid = (data[3]).uuid;
            const pricing_uuid = (data[4]).uuid;

            return [category_uuid as string, manufacturer_uuid as string, room_uuid as string, system_uuid as string, pricing_uuid as string];

        })
}

export async function saveNestedProjectFields(project: ProjectInterface) {
    const client: IClientResponse = await jetbuilt.GetClient(project.client.id);
    let calls_arr = [];

    const client_doc = createClientDocument(client);
    calls_arr.push(
        Client.findOneAndUpdate({ "metadata.external_id": String(project.client.id) }, {
            $set: client_doc,
            $setOnInsert: { uuid: ulid() }
        }, {
            upsert: true, new: true
        })
    )

    for (let index = 0; index < client.subclients.length; index++) {
        const subclient = client.subclients[index];
        const client_doc = createSubClientDocument(subclient);

        calls_arr.push(
            Client.findOneAndUpdate({ "metadata.external_id": String(project.client.id) }, {
                $set: client_doc,
                $setOnInsert: { uuid: ulid() }
            }, {
                upsert: true, new: true
            })
        )
    }

    return Promise
        .all(calls_arr)
        .then((data) => {
            const client_uuid = data[0].uuid || "";
            return [client_uuid as string]
        })
}

export async function saveNestedPurchaseOrderFields(purchaseOrder: PurchaseOrderInterface) {
    const { project_id, purchasing_source_id, line_items } = purchaseOrder;

    const purchasingSource = await getJetbuiltPurchasingSourceById(purchasing_source_id);
    const purchasingSourceDoc = createPurchasingSourceDocument(purchasingSource);
    const result = await PurchasingSource.findOneAndUpdate({ "metadata.external_id": purchasing_source_id }, {
        $set: purchasingSourceDoc,
        $setOnInsert: { uuid: ulid() }
    }, { upsert: true, new: true });
    const purchasing_source_uuid = result.uuid;

    const project = await jetbuilt.GetProject(project_id);
    const { uuid: project_uuid } = await processProjectToDb(project);

    let product_uuids = [];
    for (let index = 0; index < line_items.length; index++) {
        const element = line_items[index];
        const item = await Product.findOne({ "name": element.full_name }, { uuid: 1 });
        if (!item) {
            const log = new ExternalIntegratorAuditLog({
                success: false,
                type: `PULL_PURCHASE_ORDER_LINE_ITEMS; PO:ID ${purchaseOrder.id} LINE_ITEM:IDs ${element.ids[0]}`,
                error: "Line item, id: " + element.ids[0] + ` ${element.full_name}` + " missing from db"
            })

            await log.save();
        }
        product_uuids.push(item?.uuid || "");
    }

    return { purchasing_source_uuid, project_uuid, product_uuids };
}

export async function processProjectItemToDb(projectItem: LineItem) {
    console.log("-- updating project item ID:", projectItem.id);

    // create/update categories, manufacturers, rooms, systems, pricing docs. etc...  nested fields
    const [category_uuid, manufacturer_uuid, room_uuid, system_uuid, pricing_uuid] = await saveNestedProjectItemFields(projectItem);

    // create project schema obj
    const project_item_doc = createProjectItemDocument(projectItem, category_uuid, manufacturer_uuid, pricing_uuid, room_uuid, system_uuid);

    // save to db
    const product_in_db = await Product.findOneAndUpdate({ "name": project_item_doc.name }, {
        $set: project_item_doc,
        $setOnInsert: { uuid: ulid() },
        $push: { tags: projectItem.tag?.name },
    }, { upsert: true, new: true });

    return product_in_db
}

export async function processProjectToDb(jetbuiltProject: ProjectInterface) {

    const [client_uuid] = await saveNestedProjectFields(jetbuiltProject);
    const project_doc = createProjectDocument(
        jetbuiltProject, client_uuid
    );

    return await Project.findOneAndUpdate({ "metadata.external_id": String(jetbuiltProject.id) },
        {
            $set: project_doc,
            $setOnInsert: { uuid: ulid() }
        }
        , {
            upsert: true, new: true
        }
    )
}

export async function processPurchaseOrderToDb(jetbuiltPurchaseOrder: PurchaseOrderInterface) {
    const { id, line_items } = jetbuiltPurchaseOrder;

    console.log("-- updating project, purchasing source");
    const { project_uuid, purchasing_source_uuid, product_uuids } = await saveNestedPurchaseOrderFields(jetbuiltPurchaseOrder);

    console.log("-- updating purchase order");
    const purchase_order_doc = createPurchaseOrderDocument(
        jetbuiltPurchaseOrder, String(project_uuid), String(purchasing_source_uuid)
    );

    const po_doc = await PurchaseOrder.findOneAndUpdate({ "metadata.external_id": String(id) }, {
        $set: purchase_order_doc,
        $setOnInsert: { uuid: ulid() }
    }, {
        upsert: true, new: true
    });

    let calls_arr = product_uuids.map((puid, idx) => {
        if (!puid) return;

        const { cost, full_name, order_notes, order_quantity, order_status, project_quantity, short_description, total_order_cost, source } = line_items[idx]
        const project_items_lookup_doc: IPurchaseOrderLineItemsLookup = {
            purchase_order: po_doc.uuid as string, product: puid,
            cost, full_name, order_notes,
            order_status, short_description, total_order_cost, source,
            order_quantity: Number(order_quantity),
            project_quantity: Number(project_quantity),
        }

        return purchaseOrderProduct.findOneAndUpdate({ purchase_order: po_doc.uuid, product: puid }, {
            $set: project_items_lookup_doc,
            $setOnInsert: { uuid: ulid() }
        }, { upsert: true, new: true });
    });

    await Promise.all(calls_arr);
}

/* @@
   ___   ___  ____  ______  ___  _____________________  _  ______
  / _ | / _ \/  _/ / __/ / / / |/ / ___/_  __/  _/ __ \/ |/ / __/
 / __ |/ ___// /  / _// /_/ /    / /__  / / _/ // /_/ /    /\ \  
/_/ |_/_/  /___/ /_/  \____/_/|_/\___/ /_/ /___/\____/_/|_/___/  
                                                                 
@@ */
export async function getAllJetbuiltProjects() {
    console.log("GET ALL JETBUILT PROJECTS >>");

    const data = await jetbuilt.GetAllProjects();
    return data;

}

export async function getJetbuiltProjectItems(projectId: string) {
    // console.log("GET ALL JETBUILT PROJECT ITEMS >>");

    const data = await jetbuilt.GetAllProjectItems(projectId);
    return data;
}

export async function getJetbuiltPurchaseOrders() {
    console.log("GET ALL JETBUILT PURCHASE ORDERS >>");

    const data = await jetbuilt.GetAllPurchaseOrders();
    return data;
}

export async function getJetbuiltPurchaseOrderById(id: number | string) {
    console.log(`GET JETBUILT PURCHASE ORDER, ID:${id} >>`);

    const data = await jetbuilt.GetPurchaseOrder(id);
    return data;
}

export async function getJetbuiltPurchasingSourceById(id: number | string) {
    console.log(`GET JETBUILT PURCHASING SOURCE, ID:${id} >>`);

    const data = await jetbuilt.GetPurchasingSource(id);
    return data;
}