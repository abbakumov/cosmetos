import {PostId} from '../Post/types';
import {ProductId} from '../ProductBase/types';
import {ProductColorId} from '../ProductColor/types';
import {UnProductId} from '../UnProduct/types';

import {POST_PART_PRODUCTS_DATA_FETCHED} from './actions';

export type PostPartProductId = number;

export interface PostPartProduct {
    id: PostPartProductId
    postId: PostId
    productId: ProductId
    productColorId: ProductColorId
    unProduct: UnProductId
};

export interface PostPartProductMap {
    [id: number]: PostPartProduct
}

export interface PostPartProductState {
    items: PostPartProductMap
}

export interface PostPartProductsDataFetchedAction {
    type: typeof POST_PART_PRODUCTS_DATA_FETCHED
    payload: {
        items: PostPartProductMap
    }
}

export type PostPartProductAction =
    | PostPartProductsDataFetchedAction
    ;
