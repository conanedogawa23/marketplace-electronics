import { type Document, Schema, model } from 'mongoose';
import { hash } from 'bcrypt';
import { ulid } from 'ulid';

const userSchema = new Schema({
    // Personal Information
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    phoneNumber: {
        type: String,
        required: false, // Make true if you require phone number
    },
    dateOfBirth: {
        type: Date,
        required: false,
    },
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
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
        _id: false
    },
    // Professional Information
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        ref: 'Department',
        required: false,
    },
    position: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: false,
    },
    hireDate: {
        type: Date,
        default: Date.now,
    },
    // Optional: Track employment status
    employmentStatus: {
        type: String,
        required: true,
        enum: ['active', 'terminated'], // will change the enum values based on your business requirements
        default: 'active',
    },
    role: {
        type: String,
        ref: 'Role',
        sparse: true,
    },
    password: {
        type: String,
        required: false,
    },
    resetPassword: {
        type: Boolean,
        default: false,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null
    },
    deletedReason: {
        type: String,
        default: null,
    },
    deletedNote: {
        type: String,
        default: null,
    },
    deletedBy: {
        type: String,
        ref: 'User',
        default: null,
    },
    createdBy: {
        type: String,
        default: null,
    },
    updatedBy: {
        type: String,
        default: null,
    },
    permissions: {
        type: [String],
        ref: 'Permission',
        default: [],
    },
    projects: {
        type: [String],
        ref: 'Project',
        default: [],
    },
    admin: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        default: null,
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',

    }
}); // Include created and updated timestamps

export interface UserSchema extends Document {
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    _id: string;
    uuid: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    employeeId: string;
    department: string;
    position: string;
    salary: number;
    hireDate: Date;
    employmentStatus: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    updatedBy: string;
    deleted: boolean;
    deletedAt: Date;
    deletedBy: string;
    deletedReason: string;
    deletedNote: string;
    admin: boolean;
    image: string;
}

userSchema.pre<UserSchema>('save', async function (next) {
    if (this.isNew) {
        this.uuid = ulid()
    }
    this.password = await hash(this.password, 10);
    next()
});

const User = model<UserSchema>('User', userSchema);

export {
    User
}
