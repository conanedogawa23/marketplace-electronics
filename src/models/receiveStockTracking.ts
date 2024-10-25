import { ReceiveStockType } from "../config/common/status.ts";
import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid"

const ReceiveStockTrackingSchema = new Schema({
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

    purchase_order_product: {
        type: String,
        default: null
    },
    location_product: {
        ref: 'LocationProduct',
        type: String,
        required: true
    },
    product: {
        ref: 'Product',
        type: String,
        required: true
    },
    location: {
        ref: 'Location',
        type: String,
        required: true
    },
    note: {
        type: String,
        default: null
    },
    type: {
        type: String,
        required: true
    },

    received_quantity: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

export interface IReceiveStockTracking {
    uuid?: string

    deleted?: boolean
    deletedAt?: string
    deletedBy?: string
    createdBy?: string
    updatedBy?: string
    deletedReason?: string
    deletedNote?: string

    purchase_order_product?: string
    location_product: string
    note?: string
    type: ReceiveStockType
    received_quantity: number,
}

ReceiveStockTrackingSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

interface ReceiveStockTrackingDocument extends IReceiveStockTracking, Document { };
const ReceiveStockTracking = model<ReceiveStockTrackingDocument>('receiveStockTracking', ReceiveStockTrackingSchema);

export {
    ReceiveStockTracking,
    ReceiveStockTrackingDocument,
}