import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const uomSchema = new Schema({
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
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

uomSchema.pre('save', function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next();
})

export interface UomDocument extends Document {
    name: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
}

export const Uom = model<UomDocument>('Uom', uomSchema);
