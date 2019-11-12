import {
    ProductExtra,
    ProductExtraDataFetchedAction,
    ProductsExtraDataFetchedAction,
    ProductExtraMap
} from './types';

export const PRODUCT_EXTRA_DATA_FETCHED = 'PRODUCT_EXTRA_DATA_FETCHED';
export const PRODUCTS_EXTRA_DATA_FETCHED = 'PRODUCTS_EXTRA_DATA_FETCHED';

export const productExtraDataFetchedAction = (data: ProductExtra): ProductExtraDataFetchedAction => ({
    type: PRODUCT_EXTRA_DATA_FETCHED,
    payload: {data},
});

export const productsExtraDataFetchedAction = (data: ProductExtraMap): ProductsExtraDataFetchedAction => ({
    type: PRODUCTS_EXTRA_DATA_FETCHED,
    payload: {data},
});
