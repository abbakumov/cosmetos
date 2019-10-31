import {POST_BASE_DATA_FETCHED, POSTS_BASE_DATA_FETCHED} from './actions';
import {BlogLogin} from '../Blog/types';

export type PostId = number;

export interface PostBase {
    id: PostId;
    title: string;
    imageUrl?: string;
    authorLogin: BlogLogin;
}

// ACTIONS ->
export interface PostBaseDataFetchedAction {
    type: typeof POST_BASE_DATA_FETCHED;
    payload: {
        data: PostBase;
    };
}
export interface PostsBaseDataFetchedAction {
    type: typeof POSTS_BASE_DATA_FETCHED;
    payload: {
        data: {
            [s: number]: PostBase
        };
    };
}
// <- ACTIONS

export type PostBaseActionType =
    | PostBaseDataFetchedAction
    | PostsBaseDataFetchedAction;

export interface PostBaseState {
    items: {
        [s: string]: PostBase;
    }
};
