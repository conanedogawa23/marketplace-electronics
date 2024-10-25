export interface IClientResponse {
    id: number
    company_name: string
    delinquent: boolean
    created_at: string
    updated_at: string
    external_ids: ExternalIds
    payment_schedule: any
    primary_contact_first_name: string
    primary_contact_last_name: string
    primary_contact_title: string
    primary_contact_email: string
    primary_contact_phone_number_1: string
    primary_contact_phone_number_2: string
    address: any
    city: any
    state: any
    zipcode: any
    country: any
    subclients: Subclient[]
    contacts: Contact[]
}

export interface Subclient {
    id: number
    company_name: string
    delinquent: boolean
    payment_schedule: any
    created_at: string
    updated_at: string
    primary_contact_first_name: string
    primary_contact_last_name: string
    primary_contact_title: string
    primary_contact_email: string
    primary_contact_phone_number_1: string
    primary_contact_phone_number_2: string
    address: string
    city: string
    state: any
    zipcode: string
    country: string
    external_ids: any
}


export interface ExternalIds {
    quickbooks_online_id: string
}

export interface Contact {
    id: number
    first_name: string
    last_name: string
    title: string
    email_address: string
    phone_number_1: string
    phone_number_2: string
    description: string
    primary: boolean
    created_at: string
    updated_at: string
}
