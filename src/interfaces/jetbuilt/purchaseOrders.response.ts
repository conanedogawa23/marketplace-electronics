export type PurchaseOrderResponse = PurchaseOrderObject[]

export interface PurchaseOrderObject {
    id: number
    user_id: number
    project_id: number
    purchasing_source_id: number
    custom_id: string
    default_ship: string
    notes: string
    status: string
    shipping_option: string
    created_at: string
    updated_at: string
    ship_name: string
    ship_address: ShipAddress
}

export interface ShipAddress {
    street?: string
    city?: string
    region?: string
    postal_code?: string
    country?: string
}
