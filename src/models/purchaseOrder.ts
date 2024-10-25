import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid"

const PurchaseOrderSchema = new Schema({
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

    project: {
        type: 'String',
        ref: 'Project'
    },
    purchasingSource: {
        type: 'String',
        ref: 'purchasingSource'
    },

    custom_id: {
        type: String,
        default: null
    },
    default_ship: {
        type: String,
        default: null
    },
    notes: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: null
    },
    shipping_option: {
        type: String,
        default: null
    },
    ship_name: {
        type: String,
        default: null
    },
    ship_address: {
        type: Object,
        default: {
            street: "",
            city: "",
            region: "",
            postal_code: "",
            country: ""
        }
    },

    metadata: {
        type: Object,
        required: false,
        default: {
            external_id: null
        }
    }

}, {
    timestamps: true
});

export interface IPurchaseOrderShipAddress {
    street?: string
    city?: string
    region?: string
    postal_code?: string
    country?: string
}

export interface IPurchaseOrder {
    uuid?: string

    deleted?: boolean
    deletedAt?: string
    deletedBy?: string
    createdBy?: string
    updatedBy?: string
    deletedReason?: string
    deletedNote?: string

    project: string
    purchasingSource: string
    custom_id: string
    default_ship: string
    notes: string
    status: string
    shipping_option: string
    ship_name: string
    ship_address: IPurchaseOrderShipAddress

    metadata?: {
        external_id?: string
    }
}

PurchaseOrderSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

interface PurchaseOrderDocument extends IPurchaseOrder, Document { };
const PurchaseOrder = model<PurchaseOrderDocument>('purchaseOrder', PurchaseOrderSchema);

export {
    PurchaseOrder,
    PurchaseOrderDocument,
}