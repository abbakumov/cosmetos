import {UnProductId} from '../../../../../entities/UnProduct/types';
import {BrandId} from '../../../../../entities/Brand/types';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColorId} from '../../../../../entities/ProductColor/types';

import {
    PAGE_ADM_PROD_UN_DATA_FETCHED,
    PAGE_ADM_PROD_UN_OPEN_PRODUCT,
    PAGE_ADM_PROD_UN_CLOSE_PRODUCT,
    PAGE_ADM_PROD_UN_SAVE_PRODUCT,
    PAGE_ADM_PROD_UN_CHANGE_TEXT,
    PAGE_ADM_PROD_UN_CHANGE_VALUE,
} from './actions';

export type FieldId = 'activeBrandId' | 'activeProductId' | 'activeProductColorId';
export type FieldText = 'activeBrandText' | 'activeProductText' | 'activeProductColorText';

export interface PageAdminUnProductsState {
    unProductIds: UnProductId[]

    // popup props
    activeUnProductId?: UnProductId
    activeBrandId?: BrandId
    activeBrandText: string
    activeProductId?: ProductId
    activeProductText: string
    activeProductColorId?: ProductColorId
    activeProductColorText: string
}

export interface PageAdminUnProductsDataFetchedActionType {
    type: typeof PAGE_ADM_PROD_UN_DATA_FETCHED
    payload: {
        unProductIds: UnProductId[]
    };
}

export interface PageAdminUnProductsOpenProductActionType {
    type: typeof PAGE_ADM_PROD_UN_OPEN_PRODUCT;
    payload: {
        id: ProductId
        activeBrandId?: BrandId
        activeBrandText: string
        activeProductId?: ProductId
        activeProductText: string
        activeProductColorText: string
    };
}

export interface PageAdminUnProductsCloseProductActionType {
    type: typeof PAGE_ADM_PROD_UN_CLOSE_PRODUCT;
}

export interface PageAdminUnProductSaveProductActionType {
    type: typeof PAGE_ADM_PROD_UN_SAVE_PRODUCT;
}

export interface PageAdminUnProductChangeTextAction {
    type: typeof PAGE_ADM_PROD_UN_CHANGE_TEXT
    payload: {
        field: FieldText
        text?: string
    }
}

export interface PageAdminUnProductChangeValueAction {
    type: typeof PAGE_ADM_PROD_UN_CHANGE_VALUE
    payload: {
        field: FieldId
        value?: number
    }
}

export type PageAdminUnProductsActionType =
    | PageAdminUnProductsDataFetchedActionType
    | PageAdminUnProductsOpenProductActionType
    | PageAdminUnProductsCloseProductActionType
    | PageAdminUnProductSaveProductActionType
    | PageAdminUnProductChangeTextAction
    | PageAdminUnProductChangeValueAction
    ;
