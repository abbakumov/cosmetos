import {UnProductId} from '../../../../../entities/UnProduct/types';
import {BrandId} from '../../../../../entities/Brand/types';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColorId} from '../../../../../entities/ProductColor/types';

import {
    PAGE_ADM_PROD_UN_DATA_FETCHED,
    PAGE_ADM_PROD_UN_OPEN_PRODUCT,
    PAGE_ADM_PROD_UN_CLOSE_PRODUCT,
    PAGE_ADM_PROD_UN_SAVE_PRODUCT,
} from './actions';

export interface PageAdminUnProductsState {
    unProductIds: UnProductId[]

    // popup props
    activeUnProductId?: UnProductId
    activeBrandId?: BrandId
    activeProductId?: ProductId
    activeProductColorId?: ProductColorId
}

export interface PageAdminUnProductsDataFetchedActionType {
    type: typeof PAGE_ADM_PROD_UN_DATA_FETCHED;
    payload: {
        unProductIds: UnProductId[];
    };
}

export interface PageAdminUnProductsOpenProductActionType {
    type: typeof PAGE_ADM_PROD_UN_OPEN_PRODUCT;
    payload: {
        id: ProductId;
    };
}

export interface PageAdminUnProductsCloseProductActionType {
    type: typeof PAGE_ADM_PROD_UN_CLOSE_PRODUCT;
}

export interface PageAdminUnProductSaveProductActionType {
    type: typeof PAGE_ADM_PROD_UN_SAVE_PRODUCT;
}

export type PageAdminUnProductsActionType =
    | PageAdminUnProductsDataFetchedActionType
    | PageAdminUnProductsOpenProductActionType
    | PageAdminUnProductsCloseProductActionType
    | PageAdminUnProductSaveProductActionType
    ;
