import {BRANDS_DATA_FETCHED} from './actions';

export type BrandId = number;

export interface Brand {
    id: BrandId;
    shortName: string;
    fullName: string;
}

export interface BrandMap {
    [id: number]: Brand;
}

export interface BrandState {
    items: BrandMap;
}

export interface BrandsDataFetchedAction {
    type: typeof BRANDS_DATA_FETCHED;
    payload: {
        data: BrandMap;
    };
}

export type BrandAction =
    | BrandsDataFetchedAction;
