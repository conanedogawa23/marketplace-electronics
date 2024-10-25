import { type Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const attachmentSchema = new Schema({
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
    version: {
        type: Number,
        default: 1,
    },
    url: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        default: null,
        ref: 'User'
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
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

attachmentSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

export interface AttachmentSchema extends Document {
    name: string;
    description: string;
    uuid: string;
    url: string;
    version: number;
    createdBy: String;
    updatedBy: String;
    status: string;
    deletedAt: string;
    deletedBy: String;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
}

const Attachment = model('Attachment', attachmentSchema);

export {
    Attachment,
    attachmentSchema
}
