import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const categorySchema = new Schema({
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
    image: {
        type: String,
        required: false,
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
    metadata: {
        type: Object,
        required: false,
        default: {
            external_id: null
        }
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

export interface ICategory {
    name: string;
    description?: string;
    image?: string;
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

categorySchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

export interface CategoryDocument extends ICategory, Document { };
const Category = model<CategoryDocument>('Category', categorySchema);

export {
    Category,
    categorySchema
}
