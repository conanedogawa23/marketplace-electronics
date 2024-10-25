import { type Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
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

    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    head: {
        type: String,
        ref: 'User',
        required: false,
    },

    status: {
        type: String,
        default: null
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

export interface DepartmentSchema extends Document {
    name: string;
    description: string;
    uuid: string;
    head: string;
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: string;
    createdBy?: string;
    updatedBy?: string;
    deletedReason?: string;
    deletedNote?: string;
    createdAt: string;
    updatedAt: string;
    status: string;
}

departmentSchema.pre<DepartmentSchema>('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

const Department = model<DepartmentSchema>('Department', departmentSchema);

export {
    Department
}