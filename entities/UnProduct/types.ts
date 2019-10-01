import {UN_PRODUCTS_DATA_FETCHED} from './actions';
import {BrandId} from '../Brand/types';
import {ProductId} from '../ProductBase/types';

export type UnProductId = number;

export interface UnProduct {
    id: UnProductId;
    brandId?: BrandId;
    brandText: string;
    productId: ProductId;
    productText: string;
    colorText: string;
}

export interface UnProductState {
    items: {
        [id: number]: UnProduct;
    };
}

export interface UnProductsDataFetchedAction {
    type: typeof UN_PRODUCTS_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: UnProduct;
        };
    };
}

export type UnProductAction =
    | UnProductsDataFetchedAction;
