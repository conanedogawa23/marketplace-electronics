export enum RoleStatus {
    Active = 'active',
    Deleted = 'deleted',
    Pending = 'pending',
    Rejected = 'rejected'
}

export enum AccessLevels {
    Read = 'read',
    Write = 'write',
    Delete = 'delete',
    Edit = 'edit',
    Admin = 'admin'
}

export enum ProductType {
    STOCKED = 'stocked',
    NON_STOCKED = 'non_stocked',
    SERIALIZED = 'serialized',
    SERVICES = 'services'
}

export enum LocationTypes {
    COMPANY = 'company',
    PROJECT = 'project'
}

export enum ActivityLogType {
    ADJUST_STOCK = 'adjust_stock',
    ALLOCATE_STOCK = 'allocate_stock',
    RECEIVE_STOCK = 'receive_stock',
    TRANSFER_STOCK = 'transfer_stock',
    DEALLOCATE_STOCK = 'deallocate_stock'
}

export enum ReceiveStockType {
    MANUAL_RECEIVE = "manual",
    PURCHASE_ORDER = "purchase_order"
}