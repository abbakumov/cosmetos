import {PostProduct, PostProductsDataFetchedAction} from './types';

export const POST_PRODUCTS_DATA_FETCHED = 'POST_PRODUCTS_DATA_FETCHED';

export interface PostProductMap {
    [id: number]: PostProduct;
}

export const postProductsDataFetchedAction = (data: PostProductMap): PostProductsDataFetchedAction => ({
    type: POST_PRODUCTS_DATA_FETCHED,
    payload: {data},
});
