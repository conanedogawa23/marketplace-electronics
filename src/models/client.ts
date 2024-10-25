import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";

const clientSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
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
    uuid: {
        type: String,
        default: null,
        sparse: true,
        index: {
            unique: true,
            partialFilterExpression: { uuid: { $type: 'string' } },
        }
    },
    name: {
        type: String,
        default: null,
    },
    type: {
        type: String,
        enum: ["client", "subclient"],
        default: "client"
    },
    company_name: {
        type: String,
        required: false,
        default: null
    },
    phone_number: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: false,
        default: null
    },
    address: {
        type: Object,
        required: false,
        default: {
            address: "",
            zipcode: "",
            city: "",
            state: "",
            country: ""
        }
    },

    metadata: {
        type: Object,
        required: false,
        default: {
            external_id: null
        }
    }
}, {
    timestamps: true
})

export interface IClientAddress {
    address?: string
    zipcode?: string
    city?: string
    state?: string
    country?: string
}

export interface IClient {
    uuid?: string;
    createdBy?: string;
    updatedBy?: string;
    deletedAt?: Date;
    deletedBy?: string;
    deleted?: boolean;
    deletedReason?: string;
    deletedNote?: string;

    type?: "client" | "subclient",
    name: string;
    company_name: string;
    phone: string;
    email: string;
    address: IClientAddress;

    metadata?: {
        external_id?: string
    }
}

clientSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next();
})

export interface ClientDocument extends IClient, Document { };
const Client = model<ClientDocument>('Client', clientSchema);

export {
    Client, clientSchema
}