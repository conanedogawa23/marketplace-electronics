import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
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
        ref: 'User',
        default: null,
    },
    updatedBy: {
        type: String,
        default: null,
        ref: 'User',
    },
    status: {
        type: String,
        default: null,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
    deletedBy: {
        type: String,
        default: null,
        ref: 'User',
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
    custom_id: {
        type: String,
        required: false,
    },
    updated_at: {
        type: Date,
        default: null,
    },
    stage: {
        type: String,
        required: false,
    },
    project_type: {
        type: String,
        required: false,
    },
    payment_schedule: {
        type: String,
        required: false,
    },
    sales_tax: {
        type: String,
        required: false,
    },
    labor_tax: {
        type: String,
        required: false,
    },
    total_margin: {
        type: String,
        required: false,
    },
    equipment_margin: {
        type: String,
        required: false,
    },
    equipment_total: {
        type: String,
        required: false,
    },
    labor_total: {
        type: String,
        required: false,
    },
    shipping_total: {
        type: String,
        required: false,
    },
    tax_total: {
        type: String,
        required: false,
    },
    total: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    zipcode: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    owner: {
        type: String,
        ref: 'User',
        default: null,
    },
    client: {
        type: String,
        ref: 'Client',
        default: null,
    },
    primary_contact_id: {
        type: String,
        required: false,
    },
    company_location_id: {
        type: String,
        required: false,
    },
    company_location_name: {
        type: String,
        required: false,
    },
    metadata: {
        type: Object,
        required: false,
        default: {
            external_id: null
        }
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

export interface IProject {
    uuid?: string;
    name: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string
    updatedBy?: string
    status?: string
    deletedAt?: string
    deletedBy?: string
    deleted?: boolean
    deletedReason?: string
    deletedNote?: string
    updated_at?: string;
    custom_id?: string;
    project_type?: string;
    stage?: string;
    payment_schedule?: string;
    sales_tax?: string;
    labor_tax?: string;
    total_margin?: string;
    equipment_margin?: string;
    equipment_total?: string;
    labor_total?: string;
    shipping_total?: string;
    tax_total?: string;
    total?: string;
    address?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
    owner?: string;
    client?: string;
    primary_contact_id?: string;
    company_location_id?: string;
    company_location_name?: string;
    metadata?: {
        external_id?: string
    }
}

projectSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

export interface ProjectDocument extends IProject, Document { };
const Project = model<ProjectDocument>('Project', projectSchema);

export {
    Project,
    projectSchema,
}