import {ProductId} from '../../../../../entities/ProductBase/types';

import {
    PAGE_ADM_PROD_UN_OPEN_PRODUCT,
    PAGE_ADM_PROD_UN_SAVE_PRODUCT,
    PAGE_ADM_PROD_UN_SEARCH_PRODUCT,
} from './actions';

export interface PageAdminProductsUnassignedState {
    // popup props
    activeUnProductId?: ProductId;
    activeSearchId?: number;
    activeProductColorId?: number; // to be color id
}

export interface PageAdminProductsUnassignedOpenProductActionType {
    type: typeof PAGE_ADM_PROD_UN_OPEN_PRODUCT;
    payload: {
        id: ProductId;
    };
}

export interface PageAdminProductsUnassignedSaveProductActionType {
    type: typeof PAGE_ADM_PROD_UN_SAVE_PRODUCT;
}

export interface PageAdminProductsUnassignedSearchProductActionType {
    type: typeof PAGE_ADM_PROD_UN_SEARCH_PRODUCT;
    payload: {
        id: ProductId;
    };
}

export type PageAdminProductsUnassignedActionType =
    | PageAdminProductsUnassignedOpenProductActionType
    | PageAdminProductsUnassignedSaveProductActionType
    | PageAdminProductsUnassignedSearchProductActionType;
