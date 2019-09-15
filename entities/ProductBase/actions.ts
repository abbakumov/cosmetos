import {ProductBase, ProductsBaseDataFetchedAction} from './types';

export const PRODUCTS_BASE_DATA_FETCHED = 'PRODUCTS_BASE_DATA_FETCHED';

export interface ProductBaseMap {
    [id: number]: ProductBase;
}

export const postPartsDataFetchedAction = (data: ProductBaseMap): ProductsBaseDataFetchedAction => ({
    type: PRODUCTS_BASE_DATA_FETCHED,
    payload: {data},
});
