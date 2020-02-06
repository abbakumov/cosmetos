import {
    PostPartProductsDataFetchedAction,
    PostPartProductMap,
} from './types';

export const POST_PART_PRODUCTS_DATA_FETCHED = 'POST_PART_PRODUCTS_DATA_FETCHED';

export const postPartProductsDataFetchedAction = (items: PostPartProductMap): PostPartProductsDataFetchedAction => ({
    type: POST_PART_PRODUCTS_DATA_FETCHED,
    payload: {items},
});
