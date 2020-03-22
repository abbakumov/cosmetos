import {UN_PRODUCTS_DATA_FETCHED} from './actions';
import {BrandId} from '../Brand/types';
import {ProductId} from '../ProductBase/types';

export type UnProductId = number;

export interface UnProduct {
    id: UnProductId
    brandId?: BrandId
    brandText?: string
    productId?: ProductId
    productText?: string
    productColorText?: string
}

export interface UnProductMap {
    [id: number]: UnProduct
}

export interface UnProductState {
    items: UnProductMap
}

export interface UnProductsDataFetchedAction {
    type: typeof UN_PRODUCTS_DATA_FETCHED
    payload: {
        data: UnProductMap
    };
}

export type UnProductAction =
    | UnProductsDataFetchedAction
    ;
