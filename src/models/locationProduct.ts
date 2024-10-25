import { Schema, model, Document } from "mongoose";
import { ulid } from "ulid";

// Define the Join Schema with additional fields
const locationProductSchema = new Schema({
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
    product: {
        type: String,
        ref: 'Product',
        required: true,
    },
    location: {
        type: String,
        ref: 'Location',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    onUsed: {
        type: Number,
        required: false,
        default: 0,
    },
    lastChecked: {
        type: Date,
        required: false,
        default: null,
    },
    expirationDate: {
        type: Date,
        required: false,
        default: null,
    },
    comments: {
        type: String,
        required: false,
        default: null,
    },
    batchNumber: {
        type: String,
        required: false,
        default: null,
    },
    receivedDate: {
        type: Date,
        required: false,
        default: null,
    },
    createdBy: {
        type: String,
        ref: 'User',
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
    updatedBy: {
        type: String,
        ref: 'User',
        default: null,
    },
    status: {
        type: String,
        default: null,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export interface LocationProductDocument extends Document {
    product: string;
    location: string;
    quantity: number;
    lastChecked?: string;
    expirationDate?: string;
    comments?: string;
    batchNumber?: string;
    receivedDate?: string;
    createdAt: string;
    updatedAt: string;
    createdBy?: string;
    updatedBy?: string;
    uuid: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    status: string;
    onUsed: number;
}

locationProductSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

const LocationProduct = model<LocationProductDocument>('LocationProduct', locationProductSchema);

export {
    LocationProduct,
    locationProductSchema,
}
