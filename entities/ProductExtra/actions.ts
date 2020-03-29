import {ProductId} from '../ProductBase/types';
import {productColorsDataFetchedAction} from '../ProductColor/actions';

import {
    ProductExtra,
    ProductExtraDataFetchedAction,
    ProductsExtraDataFetchedAction,
    ProductExtraMap
} from './types';

import {getProductColors} from './api';

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

export const productExtraFetchColors = (id: ProductId) => (dispatch) =>
    getProductColors(id)
        .then(data => {
            dispatch(productColorsDataFetchedAction(data.productColor));
            dispatch(productExtraDataFetchedAction(data.productExtra));
        });
