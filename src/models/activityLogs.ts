import { ActivityLogType } from "../config/common/status.ts";
import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const reasonSchema = new Schema({
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
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const productActivityLogSchema = new Schema({
    product: {
        type: String,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    deleteSerialNumbers: {
        type: Boolean,
        required: true,
        default: false
    },
    serialNumbers: [{
        type: String,
        required: false,
        ref: 'SerializedProduct',
    }],
    fromLocation: {
        type: String,
        ref: 'Location',
        required: false,
    },
    toLocation: {
        type: String,
        ref: 'Location',
        required: false,
    },
    project: {
        type: String,
        ref: 'Project',
        required: false,
        default: null,
    },
}, {
    _id: false,
    timestamps: false,
    id: false,
})

const activityLogSchema = new Schema({
    warehouse: {
        type: String,
        ref: 'Warehouse',
        required: false,
    },
    destinationWarehouse: {
        type: String,
        ref: 'Warehouse',
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
        enum: ActivityLogType
    },
    activityId: {
        type: String,
        sparse: true,
        required: true,
        index: {
            unique: true,
            partialFilterExpression: { activityId: { $type: 'string' } },
        }
    },
    activityReason: {
        type: String,
        ref: 'ReasonLog',
        required: false,
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
    note: {
        type: String,
    },
    track: [productActivityLogSchema]
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

export interface ReasonDocument extends Document {
    name: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: Date;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
}

export interface ActivityLogDocument extends Document {
    name: string;
    note: string;
    activityId: string;
    activityReason: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: Date;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    type: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
    warehouse: string;
    destinationWarehouse: string;
    track: {
        product: string;
        quantity: number;
        deleteSerialNumbers: boolean;
        serialNumbers: string[];
        fromLocation?: string;
        toLocation: string;
    }[];
}

activityLogSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

reasonSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

const ReasonLog = model<ReasonDocument>('ReasonLog', reasonSchema);
const ActivityLog = model<ActivityLogDocument>('ActivityLog', activityLogSchema);

export {
    ActivityLog,
    activityLogSchema,
    ReasonLog,
    reasonSchema
}

