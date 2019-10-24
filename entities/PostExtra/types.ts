import {PostId} from '../Post/types';
import {PostPartId} from '../PostPart/types';

import {POST_EXTRA_DATA_FETCHED} from './actions';

export interface PostExtra {
    id: PostId;
    imageUrlBig: string;
    instaUrl: string;
    description: string;
    partIds: PostPartId[],
}

// ACTIONS ->
export interface PostExtraDataFetchedAction {
    type: typeof POST_EXTRA_DATA_FETCHED;
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
