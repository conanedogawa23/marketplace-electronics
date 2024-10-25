import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const ownerSchema = new Schema({
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
    name: {
        type: String,
        required: true,
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

export interface IOwner {
    uuid?: string
    name: string
    deleted?: boolean
    deletedAt?: string
    deletedBy?: string
    createdBy?: string
    updatedBy?: string
    deletedReason?: string
    deletedNote?: string
    metadata?: {
        external_id?: string
    }
}

ownerSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next();
})

export interface OwnerDocument extends IOwner, Document { };
const Owner = model<OwnerDocument>('Owner', ownerSchema);

export {
    Owner, ownerSchema
}