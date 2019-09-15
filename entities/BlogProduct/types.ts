import {BlogLogin} from '../Blog/types';
import {PostId} from '../PostBase/types';

import {BLOG_PRODUCTS_DATA_FETCHED} from './actions';

type BlogProductId = number;

export interface BlogProduct {
    id: BlogProductId;
    blogLogin: BlogLogin;
    postId: PostId;
    comment: string;
};

// ACTIONS ->
export interface BlogProductsDataFetchedAction {
    type: typeof BLOG_PRODUCTS_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: BlogProduct;
        }
    }
};
// <- ACTIONS

export type BlogProductsActionType =
    | BlogProductsDataFetchedAction;

export interface PostPartState {
    items: {
        [s: number]: BlogProduct;
    }
};
