import { type Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const auditLogSchema = new Schema({
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

    success: {
        type: Boolean,
        default: true
    },

    type: {
        type: String,
        required: true
    },

    error: {
        err: {
            type: String,
            required: false
        },
        code: {
            type: String,
            required: false
        },
        status: {
            type: String,
            required: false
        },
        message: {
            type: String,
            required: false
        },
        data: {
            type: Object,
            required: false
        }
    },

    external_resource: {
        requestConfig: {
            method: {
                type: String,
                required: false
            },
            baseURL: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: false
            },
            params: {
                type: Object,
                required: false
            },
            headers: {
                type: Object,
                required: false
            }
        },
        statusCode: {
            type: String,
            required: false
        }
    }

}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
})

interface ErrorLog {
    err?: string, // runtime error message+stack
    code?: string, // javascript error code
    status?: string // http error code
    message?: string, // axios error message
    data?: any //axios error response data
}

interface RequestLog {
    method?: string,
    baseURL?: string,
    url?: string,
    params?: any,
    headers?: any
}

export interface IExternalIntegratorAuditLog {
    uuid?: string
    createdAt?: string
    updatedAt?: string
    deleted?: boolean;
    deletedAt?: string;
    deletedBy?: string;
    createdBy?: string;
    updatedBy?: string;
    deletedReason?: string;
    deletedNote?: string;
    success?: boolean
    type: string
    error?: ErrorLog
    external_resource?: {
        requestConfig?: RequestLog
        statusCode?: string
    }
}

auditLogSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

interface ExternalIntegratorAuditLogDocument extends IExternalIntegratorAuditLog, Document { };
const ExternalIntegratorAuditLog = model<ExternalIntegratorAuditLogDocument>('externalIntegratorAuditLogs', auditLogSchema);

export {
    ExternalIntegratorAuditLog,
    ExternalIntegratorAuditLogDocument,
    ErrorLog,
    RequestLog
}