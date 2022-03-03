export type TransportServicesRequest = {
    weight_capacity?: number;
    weight_unit?: string;
    has_refrigeration?: boolean;
    type?: string;
    county_coverage?: string;
    availability?: string;
    availability_interval_from?: Date;
    availability_interval_to?: Date;
    driver_name: string;
    driver_id: string;
    driver_contact: string;
    car_registration_number: string;
    available_seats?: number;
    has_disabled_access?: boolean;
    pets_allowed?: boolean;
    status?: number;
    donor?: string;
    category?: string;
}