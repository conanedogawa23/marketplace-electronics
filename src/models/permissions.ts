import { type Document, Schema, model } from 'mongoose';
import { ulid } from 'ulid';

const permissionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        ref: 'User',
    },
    updatedBy: {
        type: String,
        ref: 'User',
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
    module: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    feature: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    accessLevel: {
        type: String,
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
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false,
})

permissionSchema.pre('save', function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next();
});

export interface PermissionDocument extends Document {
    name: string;
    createdBy: string;
    updatedBy: string;
    uuid: string;
    module: string;
    status: string;
    feature: string;
    description: string;
    accessLevel: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
}

export const Permission = model<PermissionDocument>('Permission', permissionSchema);