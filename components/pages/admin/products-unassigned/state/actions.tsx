import {
    PageAdminUnProductsDataFetchedActionType,
    PageAdminUnProductsOpenProductActionType,
    PageAdminUnProductsCloseProductActionType,
    PageAdminUnProductSaveProductActionType,
} from './types';

import {UnProductId} from '../../../../../entities/UnProduct/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

export const PAGE_ADM_PROD_UN_DATA_FETCHED = 'PAGE_ADM_PROD_UN_DATA_FETCHED';
export const PAGE_ADM_PROD_UN_OPEN_PRODUCT = 'PAGE_ADM_PROD_UN_OPEN_PRODUCT';
export const PAGE_ADM_PROD_UN_CLOSE_PRODUCT = 'PAGE_ADM_PROD_UN_CLOSE_PRODUCT';
export const PAGE_ADM_PROD_UN_SAVE_PRODUCT = 'PAGE_ADM_PROD_UN_SAVE_PRODUCT';

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

export const pageAdminUnProductsCloseProductAction
    = ():PageAdminUnProductsCloseProductActionType => ({
        type: PAGE_ADM_PROD_UN_CLOSE_PRODUCT,
    });

export const pageAdminUnProductSaveProductAction
    = ():PageAdminUnProductSaveProductActionType => ({
        type: PAGE_ADM_PROD_UN_SAVE_PRODUCT,
    });
