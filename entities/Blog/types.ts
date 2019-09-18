import {PostId} from '../PostBase/types';

import {
    BLOG_DATA_FETCHED,
    BLOGS_DATA_FETCHED,
} from './actions';

export type BlogLogin = string;

export interface Blog {
    login: BlogLogin;
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
export interface BlogsDataFetchedAction {
    type: typeof BLOGS_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: Blog;
        }
    }
}
// <- ACTIONS

export type BlogActionType =
    | BlogDataFetchedAction
    | BlogsDataFetchedAction;

export interface BlogState {
    items: {
        [s: string]: Blog;
    }
};
