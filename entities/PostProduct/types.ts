import {PostId} from '../PostBase/types';
import {ProductId} from '../ProductBase/types';
import {ProductColorId} from '../ProductColor/types';

import {POST_PRODUCTS_DATA_FETCHED} from './actions';

type PostProductId = number;

export interface PostProduct {
    id: PostProductId;
    postId: PostId;
    productId: ProductId;
    productColorId: ProductColorId;
};

// ACTIONS ->
export interface PostProductsDataFetchedAction {
    type: typeof POST_PRODUCTS_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: PostProduct;
        }
    }
};
// <- ACTIONS

export type PostProductActionType =
    | PostProductsDataFetchedAction;

export interface PostProductState {
    items: {
        [s: number]: PostProduct;
    }
};