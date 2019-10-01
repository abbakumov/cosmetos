import {BRANDS_DATA_FETCHED} from './actions';

export type BrandId = number;

export interface Brand {
    id: BrandId;
    shortName: string;
    fullName: string;
}

export interface BrandState {
    items: {
        [id: number]: Brand;
    };
}

export interface BrandsDataFetchedAction {
    type: typeof BRANDS_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: Brand;
        };
    };
}

export type BrandAction =
    | BrandsDataFetchedAction;
