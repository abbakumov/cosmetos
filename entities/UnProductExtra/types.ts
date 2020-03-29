import {UnProductId} from '../UnProduct/types';
import {PostId} from '../Post/types';

import {UN_PRODUCTS_EXTRA_DATA_FETCHED} from './actions';

export interface UnProductExtra {
    id: UnProductId
    userName: string
    postId: PostId
    postTitle: string
}

export interface UnProductExtraMap {
    [id: number]: UnProductExtra
}

export interface UnProductExtraState {
    items: UnProductExtraMap
}

export interface UnProductsExtraDataFetchedAction {
    type: typeof UN_PRODUCTS_EXTRA_DATA_FETCHED
    payload: {
        data: UnProductExtraMap
    }
}

export type UnProductExtraAction =
    | UnProductsExtraDataFetchedAction
    ;
