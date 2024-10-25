import { ulid } from 'ulid';
import { RoleStatus } from '../config/common/status.ts';
import { Schema, model } from 'mongoose';
import { Document } from 'mongodb';

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    status: {
        type: String,
        enum: RoleStatus,
        default: RoleStatus.Active,
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
        ref: 'User',
    },
    updatedBy: {
        type: String,
        ref: 'User',
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    },
    versionKey: false,
})

roleSchema.pre('save', function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next();
});

export interface RoleDocument extends Document {
    name: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
}

export const Role = model('Role', roleSchema);