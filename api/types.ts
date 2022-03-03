export type TransportServicesRequest = {
  weight_capacity?: number
  weight_unit?: string
  has_refrigeration?: boolean
  type?: string
  county_coverage?: string
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
}

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
