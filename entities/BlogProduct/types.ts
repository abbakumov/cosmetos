import {BlogLogin} from '../Blog/types';

import {BLOG_PRODUCTS_DATA_FETCHED} from './actions';
import {ProductId} from '../ProductBase/types';

export type BlogProductId = number;

export interface BlogProduct {
    id: BlogProductId;
    blogLogin: BlogLogin;
    productId: ProductId;
    review: string;
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

export type BlogProductActionType =
    | BlogProductsDataFetchedAction;

export interface BlogProductState {
    items: {
        [s: number]: BlogProduct;
    }
};
