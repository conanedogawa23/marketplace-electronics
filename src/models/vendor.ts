import { type Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const vendorSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    source: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    deletedAt: {
        type: String,
        default: null,
    },
    deletedBy: {
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
        required: false,
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })


vendorSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

export interface VendorDocument extends Document {
    name: string;
    description: string;
    email: string;
    source: string;
    phoneNumber: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
    createdBy: string;
    updatedBy: string;
    status: string;
}

const Vendor = model<VendorDocument>('Vendor', vendorSchema);

export {
    Vendor,
    vendorSchema
}
