import { FormPageProps } from "@/components/FormPage/FormPage"

export type OfferTransportServicesRequest = {
  weight_capacity?: number
  weight_unit?: string
  has_refrigeration?: boolean
  type?: string
  county_coverage?: string[]
  availability?: string
  availability_interval_from?: Date
  availability_interval_to?: Date
  driver_name: string
  driver_id: string
  driver_contact: string
  car_registration_number: string
  available_seats?: number
  has_disabled_access?: boolean
  pets_allowed?: boolean
  status?: number
  donor?: string
  category?: number
  description?: string
  kind: FormPageProps.Offer
}


export type RequestTransportServicesRequest = {
  made_by?: string
  weight_capacity?: number
  weight_unit?: string
  has_refrigeration?: boolean
  from_county: string
  from_city: string
  to_county: string
  to_city: string
  available_seats?: number
  has_disabled_access?: boolean
  pets_allowed?: boolean
  status?: number
  donor?: string
  category?: number
  description?: string
  kind: FormPageProps.Request
}

export type TransportServicesRequest = OfferTransportServicesRequest | RequestTransportServicesRequest

export enum TransportType {
  National = '1',
  County = '2',
}

export enum AvailabilityType {
  Weekend = 'WK',
  Weekdays = 'WD',
  Anytime = 'A',
  FixedIntervals = 'FI',
}

export enum TransportCategories {
  Goods = 1,
  People = 2,
  Medical = 3,
  Other = 4,
}

export type DonateItemRequest = {
  county_coverage: string[]
  has_transportation?: boolean
  town?: string
  description?: string
  status?: string
  name: string
  quantity?: number
  packaging_type?: string
  unit_type?: string
  expiration_date?: string
  stock?: number
  kids_age?: string
  other_textiles?: string
  tent_capacity?: number
  donor?: number
  made_by?: number
  category?: number
  textile_category?: number
  kind: 'withName'
}

//New type for OfferTents and OfferTextileProduct
export type DonateItemRequestWithoutName = {
  kind: 'noName',
  county_coverage: string[]
  has_transportation?: boolean
  town?: string
  quantity?: number
  packaging_type?: string
  unit_type?: string
  textile_size?: string
  other_textiles?: string
  tent_capacity?: number
  category?: number
  textile_category?: number
  donor?: string
  made_by?: number
}

export type DonateItemRequestUnion = DonateItemRequest | DonateItemRequestWithoutName

export type RequestItemRequest = {
  county_coverage: string
  has_transportation?: boolean
  town?: string
  description?: string
  status?: string
  name?: string
  quantity?: number
  packaging_type?: string
  unit_type?: string
  expiration_date?: string
  stock?: number
  kids_age?: string
  other_textiles?: string
  tent_capacity?: number
  donor?: number
  made_by?: number
  category?: number
  textile_category?: number
  textile_size?: string
  kind: 'withName'
}

//New type for OfferTents
export type RequestItemRequestWithoutName = {
  kind: 'noName',
  county_coverage: string
  has_transportation?: boolean
  town?: string
  quantity?: number
  packaging_type?: string
  unit_type?: string
  textile_size?: string
  other_textiles?: string
  tent_capacity?: number
  category?: number
  textile_category?: number
  made_by?: number
  name?: string // name is required by api
}

export type RequestItemRequestUnion = RequestItemRequest | RequestItemRequestWithoutName
export type ItemRequestUnion = RequestItemRequestUnion | DonateItemRequestUnion

export type DonateVolunteeringRequest = {
  type: number
  town?: string
  name: string
  description?: string
  available_until?: string
  county_coverage: string[]
  made_by?: string
}

export type DonateOtherRequest = {
  name: string
  category: number
  description?: string
  available_until?: string
  county_coverage?: string[]
  town?: string
  made_by?: string
}

export type ServerError = {
  endpoint: string
  error: Record<string, string[]>[]
  status: number
  statusText: string
}

export type ServerErrorByEndpoint = Record<string, Record<string, string[]>[]>
