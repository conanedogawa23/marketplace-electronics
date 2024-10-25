import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const manufacturerSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
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
        ref: 'User',
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
    deletedAt: {
        type: String,
        default: null,
    },
    deletedBy: {
        type: String,
        ref: 'User',
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
    uuid: {
        type: String,
        default: null,
        sparse: true,
        index: {
            unique: true,
            partialFilterExpression: { uuid: { $type: 'string' } },
        }
    },

    metadata: {
        type: Object,
        required: false,
        default: {
            external_id: null
        }
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

export interface IManufacturer {
    name: string;
    description?: string;
    createdBy?: string;
    updatedBy?: string;
    status?: string;
    deletedAt?: string;
    deletedBy?: string;
    deleted?: boolean;
    deletedReason?: string;
    deletedNote?: string;
    createdAt?: string;
    updatedAt?: string;
    uuid?: string;

    metadata?: {
        external_id?: string
    }
}

manufacturerSchema.pre('save', function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
})

export interface ManufacturerDocument extends IManufacturer, Document { };
const Manufacturer = model<ManufacturerDocument>('Manufacturer', manufacturerSchema);

export {
    Manufacturer,
    manufacturerSchema
}