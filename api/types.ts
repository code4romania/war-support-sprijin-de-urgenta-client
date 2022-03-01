export type GoodsTransportServicesRequest = {
    name?:string;
    description?: string;
    available_until?: Date,
    is_finished?: boolean,
    county_coverage?: string;
    is_infinitely_reusable?: string;
    currently_in_use?: true;
    used_by?: string;
    usable_weight?: number;
    has_refrigeration?: boolean;
    subCategory?: number;
    donor?: number;
}