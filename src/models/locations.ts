import { Document, Schema, model } from "mongoose";
import { ulid } from "ulid";
import { LocationTypes } from "../config/common/status.ts";

const areaSchema = new Schema({
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
    },
    warehouse: {
        type: String,
        ref: 'Warehouse'
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const rackSchema = new Schema({
    uuid: {
        type: String,
        default: null,
        sparse: true,
        index: {
            unique: true,
            partialFilterExpression: { uuid: { $type: 'string' } },
        }
    },
    area: {
        type: String,
        ref: 'Area',
        required: true,
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

const shelfSchema = new Schema({
    uuid: {
        type: String,
        default: null,
        sparse: true,
        index: {
            unique: true,
            partialFilterExpression: { uuid: { $type: 'string' } },
        }
    },
    rack: {
        type: String,
        ref: 'Rack',
        required: true,
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

const binSchema = new Schema({
    uuid: {
        type: String,
        default: null,
        sparse: true,
        index: {
            unique: true,
            partialFilterExpression: { uuid: { $type: 'string' } },
        }
    },
    shelf: {
        type: String,
        ref: 'Shelf',
        required: true,
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

const locationSchema = new Schema({
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
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    type: {
        type: String,
        enum: LocationTypes,
        required: true,
    },
    area: {
        type: String,
        ref: 'Area',
        required: false,
    },
    rack: {
        type: String,
        ref: 'Rack',
        required: false,
    },
    shelf: {
        type: String,
        ref: 'Shelf',
        required: false,
    },
    bin: {
        type: String,
        ref: 'Bin',
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
    },
    warehouse: {
        type: String,
        ref: 'Warehouse',
        required: false
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

const warehouseSchema = new Schema({
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
    },
    address: {
        type: String,
        default: null
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

warehouseSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
})

locationSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
});

areaSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
})

rackSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
})

shelfSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
})

binSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid();
    }
    next()
})

export interface LocationDocument extends Document {
    name: string;
    description: string;
    type: LocationTypes;
    area: string;
    rack: string;
    shelf: string;
    bin: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
    warehouse: string;
}

export interface AreaDocument extends Document {
    name: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
    warehouse: string;
}

export interface RackDocument extends Document {
    area: string;
    name: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
}

export interface ShelfDocument extends Document {
    rack: string;
    name: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
}

export interface BinDocument extends Document {
    shelf: string;
    name: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
}

export interface WarehouseDocument extends Document {
    name: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    status: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
    address: string;
}

const Area = model<AreaDocument>('Area', areaSchema);
const Rack = model<RackDocument>('Rack', rackSchema);
const Shelf = model<ShelfDocument>('Shelf', shelfSchema);
const Bin = model<BinDocument>('Bin', binSchema);
const Warehouse = model<WarehouseDocument>('Warehouse', warehouseSchema);

const Location = model<LocationDocument>('Location', locationSchema);

export {
    Location,
    locationSchema,
    Area,
    Rack,
    Shelf,
    Bin,
    Warehouse
}