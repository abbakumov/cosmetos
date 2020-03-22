import {
    UnProductMap,
    UnProductsDataFetchedAction,
} from './types';

export const UN_PRODUCTS_DATA_FETCHED = 'UN_PRODUCTS_DATA_FETCHED';

export const unProductsDataFetchedAction = (data: UnProductMap): UnProductsDataFetchedAction => ({
    type: UN_PRODUCTS_DATA_FETCHED,
    payload: {data},
});
