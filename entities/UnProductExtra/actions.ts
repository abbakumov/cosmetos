import {
    UnProductExtraMap,
    UnProductsExtraDataFetchedAction,
} from './types';

export const UN_PRODUCTS_EXTRA_DATA_FETCHED = 'UN_PRODUCTS_EXTRA_DATA_FETCHED';

export const unProductsExtraDataFetchedAction = (data: UnProductExtraMap): UnProductsExtraDataFetchedAction => ({
    type: UN_PRODUCTS_EXTRA_DATA_FETCHED,
    payload: {data},
});
