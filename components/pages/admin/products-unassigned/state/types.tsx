import {ProductId} from '../../../../../entities/ProductBase/types';
import {UnProductId} from '../../../../../entities/UnProduct/types';

import {
    PAGE_ADM_PROD_UN_DATA_FETCHED,
    PAGE_ADM_PROD_UN_OPEN_PRODUCT,
    PAGE_ADM_PROD_UN_SAVE_PRODUCT,
    PAGE_ADM_PROD_UN_SEARCH_PRODUCT,
} from './actions';

export interface PageAdminProductsUnassignedState {
    unProductIds: UnProductId[];

    // popup props
    activeUnProductId?: ProductId;
    activeSearchId?: number;
    activeProductColorId?: number; // to be color id
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

export interface PageAdminUnProductSaveProductActionType {
    type: typeof PAGE_ADM_PROD_UN_SAVE_PRODUCT;
}

export interface PageAdminUnProductSearchProductActionType {
    type: typeof PAGE_ADM_PROD_UN_SEARCH_PRODUCT;
    payload: {
        id: ProductId;
    };
}

export type PageAdminUnProductsActionType =
    | PageAdminUnProductsDataFetchedActionType
    | PageAdminUnProductsOpenProductActionType
    | PageAdminUnProductSaveProductActionType
    | PageAdminUnProductSearchProductActionType;
