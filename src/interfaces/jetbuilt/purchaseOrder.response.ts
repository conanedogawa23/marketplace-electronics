export interface PurchaseOrder {
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
    line_items: LineItem[]
}

export interface ShipAddress {
    street: string
    city: string
    region: string
    postal_code: string
    country: string
}

export interface LineItem {
    ids: number[]
    full_name: string
    short_description: string
    order_status: string
    order_notes: any
    cost: string
    total_order_cost: string
    project_quantity: string
    order_quantity: string,
    source?: {
        id: number | string,
        name?: string
    }
}
