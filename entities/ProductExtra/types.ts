import {PageProductSaveCommentSuccessAction} from '../../components/pages/product/state/types';

import {ProductId} from '../ProductBase/types';
import {PostId} from '../Post/types';
import {ProductColorId} from '../ProductColor/types';
import {BlogProductId} from '../BlogProduct/types';

import {
    PRODUCT_EXTRA_DATA_FETCHED,
    PRODUCTS_EXTRA_DATA_FETCHED,
} from './actions';

export interface ProductExtra {
    id: ProductId
    description: string
    postIds: PostId[]
    bigPicUrl: string
    colorIds: ProductColorId[]
    blogProductIds: BlogProductId[]
}

export interface ProductExtraMap {
    [id: number]: ProductExtra;
}

// ACTIONS ->
export interface ProductExtraDataFetchedAction {
    type: typeof PRODUCT_EXTRA_DATA_FETCHED;
    payload: {
        data: ProductExtra;
    };
}

export interface ProductsExtraDataFetchedAction {
    type: typeof PRODUCTS_EXTRA_DATA_FETCHED;
    payload: {
        data: ProductExtraMap;
    };
}
// <- ACTIONS

export type ProductExtraActionType =
    | ProductExtraDataFetchedAction
    | ProductsExtraDataFetchedAction
    | PageProductSaveCommentSuccessAction
    ;

export interface ProductExtraState {
    items: {
        [id: number]: ProductExtra;
    }
}
