import {PostId} from '../PostBase/types';
import {PostPartId} from '../PostPart/types';

import {POSTS_EXTRA_DATA_FETCHED} from './actions';

export interface PostExtra {
    id: PostId;
    imageUrlBig: string;
    instaUrl: string;
    description: string;
    parts: PostPartId[],
}

// ACTIONS ->
export interface PostExtraDataFetchedAction {
    type: typeof POSTS_EXTRA_DATA_FETCHED;
    payload: {
        data: PostExtra;
    }
};
// <- ACTIONS

export type PostExtraActionType =
    | PostExtraDataFetchedAction;

export interface PostExtraState {
    items: {
        [s: number]: PostExtra;
    }
};
