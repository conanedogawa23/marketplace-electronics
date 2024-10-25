export interface ProjectItemsResponse {
    line_items: LineItem[]
    factors: any[]
}

export interface LineItem {
    id: number
    manufacturer_id: number
    model: string
    part_number?: string
    msrp?: string
    mapp?: string
    owner_furnished: boolean
    cost: string
    currency_iso: string
    "custom?": boolean
    price: string
    short_description: string
    shipping_price: string
    subtotal_equipment_price: string
    total_equipment_price: string
    tax_equipment: boolean
    tax_shipping: boolean
    created_at: string
    updated_at: string
    notes?: string
    external_notes: any
    subcontract_labor_cost: string
    subcontract_labor_price: string
    kind: string // Category >> Product.category
    hidden: boolean
    purchasing_released: boolean
    metadata: Metadata
    manufacturer_name: string
    engineering_released: boolean
    discount: string
    custom: boolean
    product_id?: number
    custom_product_id?: number
    quantity: string
    quantity_per_room: string
    quantity_per_bundle: any
    bundle: any
    room: Room
    system: System
    tag: {
        id: number
        name: string
    }
    phase?: Phase
    option: any
    replacement_lineitem_ids: any[]
    labor: Labor[]
}

export interface Metadata { }

export interface Room {
    id: number
    name: string
    quantity: number
}

export interface System {
    id: number
    name: string
}

export interface Phase {
    id: number
    name: string
}

export interface Labor {
    category: string
    minutes: string
    taxable: boolean
    cost: string
    price: string
    labor_type: LaborType
}

export interface LaborType {
    id: number
    name: string
}
