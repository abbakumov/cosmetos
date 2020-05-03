import {
    PostBase,
    PostMap,
    PostBaseDataFetchedAction,
    PostsBaseDataFetchedAction,
} from './types';

export const POST_BASE_DATA_FETCHED = 'POST_BASE_DATA_FETCHED';
export const POSTS_BASE_DATA_FETCHED = 'POSTS_BASE_DATA_FETCHED';

export const postBaseDataFetchedAction = (data: PostBase): PostBaseDataFetchedAction => ({
    type: POST_BASE_DATA_FETCHED,
    payload: {data},
});

export const postsBaseDataFetchedAction = (data: PostMap): PostsBaseDataFetchedAction => ({
    type: POSTS_BASE_DATA_FETCHED,
    payload: {data},
});
