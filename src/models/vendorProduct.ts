import { type Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const vendorProductSchema = new Schema({
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
    vendor: {
        type: String,
        ref: 'Vendor',
        required: true,
    },
    product: {
        type: String,
        ref: 'Product',
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    currency: {
        type: String,
        required: false
    },
    createdBy: {
        type: String,
        required: false,
    },
    updatedBy: {
        type: String,
        ref: 'User',
        default: null,
    },
    deletedAt: {
        type: Date,
        required: false,
        default: null,
    },
    deletedBy: {
        type: String,
        required: false,
        default: null,
    },
    deleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    deletedReason: {
        type: String,
        required: false,
        default: null,
    },
    deletedNote: {
        type: String,
        required: false,
        default: null,
    },
    status: {
        type: String,
        required: false,
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

export interface VendorProductDocument extends Document {
    uuid: string
    vendor: string
    product: string
    price: number
    currency: string
    createdBy: string
    updatedBy: string
    deletedAt: string
    deletedBy: string
    deleted: boolean
    deletedReason: string
    deletedNote: string
    status: string
}

vendorProductSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

const VendorProduct = model<VendorProductDocument>('VendorProduct', vendorProductSchema);

export {
    VendorProduct,
    vendorProductSchema,
}