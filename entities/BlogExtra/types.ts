
import {BlogLogin} from '../Blog/types';
import {PostId} from '../Post/types';

import {BLOG_EXTRA_DATA_FETCHED} from './actions';

export interface BlogExtra {
    login: BlogLogin;
    instagramLogin: string,
    postIds: PostId[],
};

// ACTIONS ->
export interface BlogExtraDataFetchedAction {
    type: typeof BLOG_EXTRA_DATA_FETCHED;
    payload: {
        data: BlogExtra;
    }
};
// <- ACTIONS

export type BlogExtraActionType =
    | BlogExtraDataFetchedAction;

export interface BlogExtraState {
    items: {
        [s: number]: BlogExtra;
    }
};
