import {PostProductMap, PostProductsDataFetchedAction} from './types';

export const POST_PRODUCTS_DATA_FETCHED = 'POST_PRODUCTS_DATA_FETCHED';

export const postProductsDataFetchedAction = (data: PostProductMap): PostProductsDataFetchedAction => ({
    type: POST_PRODUCTS_DATA_FETCHED,
    payload: {data},
});
