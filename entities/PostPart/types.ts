import {ProductId} from '../ProductBase/types';
import {Position} from '../Position';

import {POSTS_PARTS_DATA_FETCHED} from './actions';

export type PostPartId = number;

export interface PostPart {
    id: PostPartId;
    title: string;
    position: Position;
    color: string;
    productIds: ProductId[];
}

// ACTIONS ->
export interface PostPartsDataFetchedAction {
    type: typeof POSTS_PARTS_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: PostPart;
        }
    }
};
// <- ACTIONS

export type PostPartActionType =
    | PostPartsDataFetchedAction;

export interface PostPartState {
    items: {
        [s: number]: PostPart;
    }
};
