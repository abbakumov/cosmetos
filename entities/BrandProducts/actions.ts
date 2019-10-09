import {
    BrandProducts,
    BrandProductsDataFetchedAction,
} from './types';

export const BRAND_PRODUCTS_DATA_FETCHED = 'BRAND_PRODUCTS_DATA_FETCHED';

export const brandProductsDataFetchedAction = (data: BrandProducts): BrandProductsDataFetchedAction => ({
    type: BRAND_PRODUCTS_DATA_FETCHED,
    payload: {data},
});
