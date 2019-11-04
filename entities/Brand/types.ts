import {PageAdminBrandsSaveSuccessAction} from '../../components/pages/admin/brands/store/types';

import {BRANDS_DATA_FETCHED} from './actions';

export type BrandId = number;

export interface Brand {
    id: BrandId;
    titleShort: string;
    titleFull: string;
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
    | BrandsDataFetchedAction
    | PageAdminBrandsSaveSuccessAction
    ;
