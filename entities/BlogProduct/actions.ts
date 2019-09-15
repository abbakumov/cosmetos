import {BlogProduct, BlogProductsDataFetchedAction} from './types';

export const BLOG_PRODUCTS_DATA_FETCHED = 'BLOG_PRODUCTS_DATA_FETCHED';

export interface BlogProductMap {
    [id: number]: BlogProduct;
}

export const blogProductsDataFetchedAction = (data: BlogProductMap): BlogProductsDataFetchedAction => ({
    type: BLOG_PRODUCTS_DATA_FETCHED,
    payload: {data},
});
