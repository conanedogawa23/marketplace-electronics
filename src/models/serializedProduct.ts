import { Schema, model, type Document } from "mongoose";
import { ulid } from "ulid";

const serializedProductSchema = new Schema({
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
    number: {
        type: String,
        required: true,
        unique: true,
        index: {
            unique: true,
            partialFilterExpression: { number: { $type: 'string' } },
        }
    },
    product: {
        type: String,
        ref: 'Product',
        required: true,
    },
    project: {
        type: String,
        ref: 'Project',
        required: false,
        default: null,
    },
    locationId: {
        type: String,
        ref: 'Location',
        required: false,
    },
    status: {
        type: String,
        required: true,
    },
    // TODO: Need to be updated and incrementally modified to support tracking or have a new collection for the same
    tracking: [{
        type: String,
        required: false,
    }],
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
    deletedReason: {
        type: String,
        required: false,
    },
    deletedNote: {
        type: String,
        required: false,
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

serializedProductSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

export interface SerializedProductInterface extends Document {
    uuid: string;
    number: string;
    locationId: string;
    status: string;
    tracking: string[];
    createdBy: string;
    updatedBy: string;
    deleted: boolean;
    deletedAt: string;
    deletedBy: string;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    product: string;
    project: string;
}

const SerializedProduct = model<SerializedProductInterface>('SerializedProduct', serializedProductSchema);

export {
    SerializedProduct,
    serializedProductSchema,
}