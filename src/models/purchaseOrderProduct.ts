import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid"

const PurchaseOrderLineItemsLookupSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    uuid: {
        type: String,
        default: null,
        sparse: true,
        index: {
            unique: true,
            partialFilterExpression: { uuid: { $type: 'string' } },
        }
    },

    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        required: false,
    },
    deletedBy: {
        type: String,
        ref: 'User',
        required: false,
    },
    createdBy: {
        type: String,
        ref: 'User',
        required: false,
    },
    updatedBy: {
        type: String,
        ref: 'User',
        required: false,
    },
    deletedReason: {
        type: String,
        default: null,
    },
    deletedNote: {
        type: String,
        default: null,
    },

    purchase_order: {
        type: String,
        ref: 'purchaseOrder',
        required: true
    },
    product: {
        type: String,
        ref: 'Product',
        required: true
    },

    full_name: {
        type: String,
        default: null
    },
    short_description: {
        type: String,
        default: null
    },
    order_status: {
        type: String,
        default: null
    },
    order_notes: {
        type: String,
        default: null
    },
    cost: {
        type: String,
        default: null
    },
    total_order_cost: {
        type: String,
        default: null
    },
    project_quantity: {
        type: Number,
        default: 0
    },
    order_quantity: {
        type: Number,
        default: 0
    },
    received_quantity: {
        type: Number,
        default: 0
    },

    source: {
        id: {
            type: Number,
            default: null
        },
        name: {
            type: String,
            default: null
        }
    }

}, {
    timestamps: true
})

export interface IPurchaseOrderLineItemsLookup {
    uuid?: string

    deleted?: boolean
    deletedAt?: string
    deletedBy?: string
    createdBy?: string
    updatedBy?: string
    deletedReason?: string
    deletedNote?: string

    purchase_order: string
    product: string
    full_name?: string | null,
    short_description?: string | null,
    order_status?: string | null,
    order_notes?: string | null,
    cost?: string | null,
    total_order_cost?: string | null,
    project_quantity?: number,
    order_quantity?: number,
    received_quantity?: number,
    source?: {
        id?: number | string,
        name?: String
    }

}

PurchaseOrderLineItemsLookupSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

interface PurchaseOrderLineItemsLookupDocument extends IPurchaseOrderLineItemsLookup, Document { };
const purchaseOrderProduct = model<PurchaseOrderLineItemsLookupDocument>('purchaseOrderProduct', PurchaseOrderLineItemsLookupSchema);

export {
    purchaseOrderProduct,
    PurchaseOrderLineItemsLookupDocument,
}