import {ProductExtra, ProductExtraDataFetchedAction} from './types';

export const PRODUCT_EXTRA_DATA_FETCHED = 'PRODUCT_EXTRA_DATA_FETCHED';

export const productExtraDataFetchedAction = (data: ProductExtra): ProductExtraDataFetchedAction => ({
    type: PRODUCT_EXTRA_DATA_FETCHED,
    payload: {data},
});
