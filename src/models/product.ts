import { ProductType } from "../config/common/status.ts";
import { Schema, model, type Document } from "mongoose";
import { ulid } from "ulid";

const productSchema = new Schema({
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
    tags: [{
        type: String,
        required: false,
    }],
    category: {
        type: String,
        ref: 'Category',
        required: true,
    },
    manufacturer: {
        type: String,
        ref: 'Manufacturer',
        required: true,
    },
    width: {
        type: Number,
        required: false,
    },
    height: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    uom: {
        type: String,
        ref: 'Uom',
        required: true,
    },
    length: {
        type: Number,
        required: false,
    },
    attachments: [{
        type: String,
        ref: 'Attachment',
        required: false,
    }],
    price: {
        type: String,
        ref: 'Pricing',
        required: true,
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
        ref: 'User'
    },
    updatedBy: {
        type: String,
        ref: 'User',
        default: null,
    },
    sku: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        // required: true,
        default: 'active',
    },
    minQuantity: {
        type: Number,
        required: false,
    },
    maxQuantity: {
        type: Number,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: ProductType,
        default: ProductType.NON_STOCKED
    },
    serialized: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: null,
    },
    adjusted: {
        type: Boolean,
        default: false,
    },
    quantity_per_room: {
        type: String,
        required: false
    },
    system: {
        type: String,
        ref: 'System',
        default: null
    },
    room: {
        type: String,
        ref: 'Room',
        default: null
    },
    onUsed: {
        type: Number,
        default: 0,
        required: false
    },
    metadata: {
        type: Object,
        required: false,
        default: {
            external_id: null
        }
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

export interface IProduct {
    name: string;
    description: string;
    tags?: string[];
    category: string;
    manufacturer: string;
    width?: number;
    height?: number;
    weight?: number;
    uom?: string;
    length?: number;
    vendors?: string[];
    attachments?: string[];
    deletedAt?: string;
    deletedBy?: string;
    deleted?: boolean;
    deletedReason?: string;
    deletedNote?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    uuid?: string;
    status?: string;
    minQuantity?: number;
    maxQuantity?: number;
    sku: string;
    price: string;
    quantity?: string;
    type?: ProductType;
    serialized?: boolean;
    notes: string;
    image: string;
    adjusted: boolean;
    quantity_per_room?: string;
    system?: string;
    room?: string;
    metadata: {
        external_id?: string;
    }
    onUsed: number;
}

productSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

export interface ProductDocument extends IProduct, Document { };
const Product = model<ProductDocument>('Product', productSchema);

export {
    Product,
    productSchema,
}
