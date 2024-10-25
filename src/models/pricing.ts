import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const pricingSchema = new Schema({
    uuid: {
        type: String,
        default: null,
        sparse: true,
        index: {
            unique: true,
            partialFilterExpression: { uuid: { $type: 'string' } },
        }
    },
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },

    createdBy: {
        type: String,
        default: null,
    },
    updatedBy: {
        type: String,
        default: null,
    },

    status: {
        type: String,
        default: null,
    },

    deleted: {
        type: Boolean,
        default: false,
    },
    deletedReason: {
        type: String,
        default: null,
    },
    deletedNote: {
        type: String,
        default: null,
    },
    deletedAt: {
        type: String,
        default: null,
    },
    deletedBy: {
        type: String,
        default: null,
    },

    msrp: {
        type: Number,
        required: true,
        default: "0",
    },
    mapp: {
        type: Number,
        required: true,
        default: "0",
    },
    cost: {
        type: Number,
        required: true,
        default: "0",
    },
    price: {
        type: Number,
        required: true,
        default: "0",
    },
    sell: {
        type: Number,
        required: true,
        default: "0",
    },
    shippingCost: {
        type: Number,
        required: true,
        default: "0",
    },
    shippingSell: {
        type: Number,
        required: true,
        default: "0",
    },

    currency_iso: {
        type: String,
        required: false,
        default: null
    },
    subtotal_equipment_price: {
        type: Number,
        required: false,
        default: null
    },
    total_equipment_price: {
        type: Number,
        required: false,
        default: null
    },
    subcontract_labor_cost: {
        type: Number,
        required: false,
        default: null
    },
    subcontract_labor_price: {
        type: Number,
        required: false,
        default: null
    },
    discount: {
        type: Number,
        required: false,
        default: null
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
})

// uuid_appdata

export interface IPricing {
    name: string;
    description?: string;

    createdBy?: string;
    updatedBy?: string;
    status?: string;
    deletedAt?: Date;
    deletedBy?: string;
    deleted?: boolean;
    deletedReason?: string;
    deletedNote?: string;
    createdAt?: Date;
    updatedAt?: Date;

    uuid?: string;

    msrp?: number;
    mapp?: number;
    cost: number;
    price: number;
    sell: number; // same as price
    shippingCost: number; // use shipping_price value
    shippingSell: number; // use shipping_price value

    currency_iso: string,
    subtotal_equipment_price: number,
    total_equipment_price: number,
    subcontract_labor_cost: number,
    subcontract_labor_price: number,
    discount: number,

    metadata?: {
        external_id?: string
    }
}

pricingSchema.pre('save', function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next();
})

export interface PricingDocument extends IPricing, Document { };
export const PricingModel = model<PricingDocument>('Pricing', pricingSchema);