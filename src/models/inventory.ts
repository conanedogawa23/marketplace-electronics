import { Document } from 'mongodb';
import { Schema, model } from 'mongoose';
import { ulid } from 'ulid';

const InventorySchema = new Schema({
    quantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        ref: 'Category',
        default: null,
    },
    image: {
        type: String,
        required: true,
    },
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
    manufacurerId: {
        type: String,
        ref: 'Manufacturer',
        default: null,
    },
    vendors: {
        type: [String],
        ref: 'Vendor',
        default: [],
    },
    product: {
        type: String,
        ref: 'Product',
        default: null,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export interface InventoryDocument extends Document {
    quantity: number;
    price: number;
    description: string;
    department: string;
    category: string;
    image: string;
    uuid: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: Date;
    updatedAt: Date;
}

InventorySchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

const Inventory = model<InventoryDocument>('Inventory', InventorySchema);

export {
    Inventory,
    InventorySchema,
}
