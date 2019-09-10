import {PostId} from '../Post/types';

import {BLOG_DATA_FETCHED} from './actions';

export type BlogId = number;

export interface Blog {
    id: BlogId;
    name: string;
    instagramLogin: string,
    imageUrl: string,
    postIds: PostId[],
};

// ACTIONS ->
export interface BlogDataFetchedAction {
    type: typeof BLOG_DATA_FETCHED;
    payload: {
        data: Blog;
    }
};
// <- ACTIONS

export type BlogActionType =
    | BlogDataFetchedAction;

export interface BlogState {
    items: {
        [s: string]: Blog;
    }
};
