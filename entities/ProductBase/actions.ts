import {
    ProductBase,
    ProductBaseMap,
    ProductBaseDataFetchedAction,
    ProductsBaseDataFetchedAction,
} from './types';

export const PRODUCT_BASE_DATA_FETCHED = 'PRODUCT_BASE_DATA_FETCHED';
export const PRODUCTS_BASE_DATA_FETCHED = 'PRODUCTS_BASE_DATA_FETCHED';

export const productBaseDataFetchedAction = (data: ProductBase): ProductBaseDataFetchedAction => ({
    type: PRODUCT_BASE_DATA_FETCHED,
    payload: {data},
});

export const productsBaseDataFetchedAction = (data: ProductBaseMap): ProductsBaseDataFetchedAction => ({
    type: PRODUCTS_BASE_DATA_FETCHED,
    payload: {data},
});
