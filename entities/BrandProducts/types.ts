import {BrandId} from '../Brand/types';
import {ProductId} from '../ProductBase/types';

import {
    BRAND_PRODUCTS_DATA_FETCHED
} from './actions';

export interface BrandProducts {
    id: BrandId;
    productIds: ProductId[];
}

export interface BrandProductsMap {
    [id: number]: BrandProducts;
}

export interface BrandProductsState {
    items: BrandProductsMap;
}

export interface BrandProductsDataFetchedAction {
    type: typeof BRAND_PRODUCTS_DATA_FETCHED;
    payload: {
        data: BrandProducts;
    };
}

export type BrandProductsAction =
    | BrandProductsDataFetchedAction;
