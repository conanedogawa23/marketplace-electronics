import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid"

const PurchasingSourceSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
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
    deletedNote: {
        type: String,
        default: null,
    },

    company_name: {
        type: String,
        default: null
    },
    first_name: {
        type: String,
        default: null
    },
    last_name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    default_ship: {
        type: String,
        default: null
    },
    dealer_number: {
        type: String,
        default: null
    },

    metadata: {
        type: Object,
        required: false,
        default: {
            external_id: null,
            created_at: null,
            updated_at: null
        }
    }
}, {
    timestamps: true
})

export interface IPurchasingSource {
    uuid?: string

    deleted?: boolean
    deletedAt?: string
    deletedBy?: string
    createdBy?: string
    updatedBy?: string
    deletedReason?: string
    deletedNote?: string

    company_name?: string
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
    default_ship?: string
    dealer_number?: any

    metadata?: {
        created_at?: string
        updated_at?: string
        external_id?: string
    }
}

interface PurchasingSourceDocument extends IPurchasingSource, Document { };

PurchasingSourceSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

const PurchasingSource = model<PurchasingSourceDocument>('purchasingSource', PurchasingSourceSchema);

export {
    PurchasingSource,
    PurchasingSourceDocument,
}