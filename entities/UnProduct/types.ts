import {PostEditProductSaveSuccessUnAction} from '../../components/pages/post-edit/store/types';

import {
    UN_PRODUCTS_DATA_FETCHED,
    UN_PRODUCT_REMOVE_SUCCESS,
    UN_PRODUCT_REMOVE_FAIL,
} from './actions';
import {BrandId} from '../Brand/types';
import {ProductId} from '../ProductBase/types';
import {PostPartProductId} from '../PostPartProduct/types';

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

export interface UnProductRemoveSuccessAction {
    type: typeof UN_PRODUCT_REMOVE_SUCCESS
    payload: {
        id: UnProductId
        postPartProductId: PostPartProductId
    }
}

export interface UnProductRemoveFailAction {
    type: typeof UN_PRODUCT_REMOVE_FAIL
    payload: {
        id: UnProductId
    }
}

export type UnProductAction =
    | UnProductsDataFetchedAction
    | UnProductRemoveSuccessAction
    | UnProductRemoveFailAction
    | PostEditProductSaveSuccessUnAction
    ;
