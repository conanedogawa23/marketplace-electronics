import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const systemSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
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

    name: {
        type: String,
        required: true,
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

export interface ISystem {
    uuid?: string
    deleted?: boolean
    deletedAt?: string
    deletedBy?: string
    createdBy?: string
    updatedBy?: string
    deletedReason?: string
    deletedNote?: string
    name: string
    metadata?: {
        external_id?: string
    }
}

systemSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next();
})

export interface SystemDocument extends ISystem, Document { };
const System = model<SystemDocument>('System', systemSchema);

export {
    System, systemSchema
}