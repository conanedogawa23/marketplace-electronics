export type AllProjects = Project[]

export interface Project {
    id: number
    name: string
    short_description?: string
    custom_id: string
    version: string
    price_valid_until: string
    probability: string
    created_at: string
    updated_at: string
    close_date: string
    budget: any
    paid_to_date: PaidToDate
    stage: string
    contract_number: any
    exchange_rates: ExchangeRates
    "requires_engineering?": boolean
    project_type: string
    payment_schedule: string
    sales_tax: string
    labor_tax: string
    total_margin: any
    equipment_margin: any
    equipment_total: any
    labor_total: any
    shipping_total: any
    tax_total: string
    total: string
    address: string
    city: string
    state: string
    zipcode: string
    country: string
    owner: Owner
    client: Client
    primary_contact: PrimaryContact
    company_location: CompanyLocation
    market_segment: MarketSegment
    currency: string
    image_url: any
    active: boolean
    shared: boolean
    original_version_id: number
}

export interface PaidToDate {
    cents: number
    currency_iso: string
}

export interface ExchangeRates { }

export interface Owner {
    id: number
    full_name: string
}

export interface Client {
    id: number
}

export interface PrimaryContact {
    id?: number
}

export interface CompanyLocation {
    id: number
    name: string
}

export interface MarketSegment {
    id: any
}
