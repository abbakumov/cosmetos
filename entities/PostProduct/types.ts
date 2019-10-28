import {PostEditProductSaveSuccessAction} from '../../components/pages/post-edit/store/types';

import {PostId} from '../Post/types';
import {ProductId} from '../ProductBase/types';
import {ProductColorId} from '../ProductColor/types';

import {POST_PRODUCTS_DATA_FETCHED} from './actions';

export type PostProductId = number;

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
    | PostProductsDataFetchedAction
    | PostEditProductSaveSuccessAction
    ;

export interface PostProductState {
    items: {
        [s: number]: PostProduct;
    }
};