import {PRODUCT_EXTRA_DATA_FETCHED} from './actions';
import {ProductId} from '../ProductBase/types';
import {PostId} from '../PostBase/types';

export interface ProductExtra {
    id: ProductId;
    description: string;
    postIds: PostId[];
}

// ACTIONS ->
export interface ProductExtraDataFetchedAction {
    type: typeof PRODUCT_EXTRA_DATA_FETCHED;
    payload: {
        data: ProductExtra;
    };
}
// <- ACTIONS

export type ProductExtraActionType =
    | ProductExtraDataFetchedAction;

export interface ProductExtraState {
    items: {
        [id: number]: ProductExtra;
    }
}
