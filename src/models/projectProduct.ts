import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid"

const ProjectLineItemLookupSchema = new Schema({
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

    project: {
        type: String,
        ref: 'Project',
        required: true
    },
    product: {
        type: String,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    allocated: {
        type: Number,
        required: true
    },
    product_location: {
        type: String,
        ref: 'Location',
        required: false,
        default: null
    },
    room: {
        type: String,
        default: null
    },
    system: {
        type: String,
        default: null
    },
    quantity_per_room: {
        type: Number,
        default: 0
    },
    quantity_per_bundle: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        default: null
    },
    external_notes: {
        type: String,
        default: null
    },
    pricing: {
        type: String,
        default: null
    },
    discount: {
        type: Number,
        default: null
    },
}, {
    timestamps: true
})

export interface IProjectLineItemLookup {
    uuid?: string
    product: string
    project: string
    deleted?: boolean
    deletedAt?: string
    deletedBy?: string
    createdBy?: string
    updatedBy?: string
    deletedReason?: string
    deletedNote?: string
    allocated: number
    quantity: number
    room?: string
    system?: string
    quantity_per_room?: number
    quantity_per_bundle?: number
    notes?: string
    external_notes?: string
    pricing?: string
    discount?: number
}

ProjectLineItemLookupSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

interface ProjectLineItemLookupDocument extends IProjectLineItemLookup, Document { };
const ProjectProduct = model<ProjectLineItemLookupDocument>('projectProduct', ProjectLineItemLookupSchema);

export {
    ProjectProduct,
    ProjectLineItemLookupDocument
}