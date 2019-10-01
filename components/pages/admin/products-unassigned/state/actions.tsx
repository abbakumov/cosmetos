import {
    PageAdminUnProductsDataFetchedActionType,
    PageAdminUnProductsOpenProductActionType,
    PageAdminUnProductSaveProductActionType,
    PageAdminUnProductSearchProductActionType,
} from './types';

import {UnProductId} from '../../../../../entities/UnProduct/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

export const PAGE_ADM_PROD_UN_DATA_FETCHED = 'PAGE_ADM_PROD_UN_DATA_FETCHED';
export const PAGE_ADM_PROD_UN_OPEN_PRODUCT = 'PAGE_ADM_PROD_UN_OPEN_PRODUCT';
export const PAGE_ADM_PROD_UN_SAVE_PRODUCT = 'PAGE_ADM_PROD_UN_SAVE_PRODUCT';
export const PAGE_ADM_PROD_UN_SEARCH_PRODUCT = 'PAGE_ADM_PROD_UN_SEARCH_PRODUCT';

export const pageAdminUnProductsDataFetchedAction
    = (unProductIds: UnProductId[]):PageAdminUnProductsDataFetchedActionType => ({
        type: PAGE_ADM_PROD_UN_DATA_FETCHED,
        payload: {unProductIds},
    });

export const pageAdminUnProductsOpenProductAction
    = (id: ProductId):PageAdminUnProductsOpenProductActionType => ({
        type: PAGE_ADM_PROD_UN_OPEN_PRODUCT,
        payload: {id},
    });

export const pageAdminUnProductSaveProductAction
    = ():PageAdminUnProductSaveProductActionType => ({
        type: PAGE_ADM_PROD_UN_SAVE_PRODUCT,
    });

export const pageAdminUnProductSearchProductAction
    = (id: ProductId):PageAdminUnProductSearchProductActionType => ({
        type: PAGE_ADM_PROD_UN_SEARCH_PRODUCT,
        payload: {id}
    });
