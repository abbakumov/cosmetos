import {PostId} from '../../../../entities/Post/types';
import {ProductColorId} from '../../../../entities/ProductColor/types';

import {
    PAGE_PRODUCT_DATA_FETCHED,
    PAGE_PRODUCT_SHOW_COLOR,
    PAGE_PRODUCT_HIDE_COLOR,
} from './actions';

export interface PageProductState {
    refPost?: PostId
    activeColorId?: ProductColorId
}

export interface PageProductDataFetchedAction {
    type: typeof PAGE_PRODUCT_DATA_FETCHED
    payload: {
        refPost: PostId
    }
};

export interface PageProductShowColorAction {
    type: typeof PAGE_PRODUCT_SHOW_COLOR
    payload: {
        colorId: ProductColorId
    }
}

export interface PageProductHideColorAction {
    type: typeof PAGE_PRODUCT_HIDE_COLOR
}

export type PageProductAction =
    | PageProductDataFetchedAction
    | PageProductShowColorAction
    | PageProductHideColorAction
    ;
