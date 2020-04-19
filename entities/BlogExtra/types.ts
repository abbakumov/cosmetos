
import {PageBlogSaveSuccessAction} from '../../components/pages/blog/state/types';
import {BlogLogin} from '../Blog/types';
import {PostId} from '../Post/types';

import {
    BLOG_EXTRA_DATA_FETCHED,
    BLOG_EXTRA_MORE_POSTS_FETCHED,
} from './actions';

export interface BlogExtra {
    login: BlogLogin
    instagramLogin: string
    postIds: PostId[]
    postsTotal: number
    bio: string
};

// ACTIONS ->
export interface BlogExtraDataFetchedAction {
    type: typeof BLOG_EXTRA_DATA_FETCHED;
    payload: {
        data: BlogExtra;
    }
};

export interface BlogExtraMorePostsFetchedAction {
    type: typeof BLOG_EXTRA_MORE_POSTS_FETCHED;
    payload: {
        login: BlogLogin
        postIds: PostId[]
    }
};
// <- ACTIONS

export type BlogExtraActionType =
    | BlogExtraDataFetchedAction
    | BlogExtraMorePostsFetchedAction
    | PageBlogSaveSuccessAction
    ;

export interface BlogExtraState {
    items: {
        [s: number]: BlogExtra;
    }
};
