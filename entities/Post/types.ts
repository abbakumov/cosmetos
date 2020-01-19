import {PostPagePublishSuccessAction} from '../../components/pages/post/state/types';

import {BlogLogin} from '../Blog/types';

import {POST_BASE_DATA_FETCHED, POSTS_BASE_DATA_FETCHED} from './actions';

export type PostId = number;

export interface PostBase {
    id: PostId;
    title: string;
    imageUrl?: string;
    authorLogin: BlogLogin;
    isPublic: boolean;
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
    | PostsBaseDataFetchedAction
    | PostPagePublishSuccessAction
    ;

export interface PostBaseState {
    items: {
        [s: string]: PostBase;
    }
};
