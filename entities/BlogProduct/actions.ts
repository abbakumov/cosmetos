import {BlogProductMap, BlogProductsDataFetchedAction} from './types';

export const BLOG_PRODUCTS_DATA_FETCHED = 'BLOG_PRODUCTS_DATA_FETCHED';

export const blogProductsDataFetchedAction = (data: BlogProductMap): BlogProductsDataFetchedAction => ({
    type: BLOG_PRODUCTS_DATA_FETCHED,
    payload: {data},
});
