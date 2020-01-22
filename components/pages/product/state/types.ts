import {PostId} from '../../../../entities/Post/types';

import {
    PAGE_PRODUCT_DATA_FETCHED,
} from './actions';

export interface PageProductState {
    refPost?: PostId;
}

export interface PageProductDataFetchedAction {
    type: typeof PAGE_PRODUCT_DATA_FETCHED;
    payload: {
        refPost: PostId;
    }
};

export type PageProductAction =
    | PageProductDataFetchedAction
    ;
