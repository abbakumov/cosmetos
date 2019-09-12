import {POSTS_BASE_DATA_FETCHED} from './actions';

export type PostId = number;

export interface PostBase {
    id: PostId;
    title: string;
    imageUrl: string;
}

export interface PostsBaseDataFetchedAction {
    type: typeof POSTS_BASE_DATA_FETCHED;
    payload: {
        data: {
            [s: number]: PostBase
        };
    };
}

export type PostBaseActionType =
    | PostsBaseDataFetchedAction;

export interface PostBaseState {
    items: {
        [s: string]: PostBase;
    }
};
