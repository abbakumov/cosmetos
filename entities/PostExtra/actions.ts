import {PostExtra, PostExtraDataFetchedAction} from './types';

export const POSTS_EXTRA_DATA_FETCHED = 'POSTS_EXTRA_DATA_FETCHED';

export const postsExtraDataFetchedAction = (data: PostExtra): PostExtraDataFetchedAction => ({
    type: POSTS_EXTRA_DATA_FETCHED,
    payload: {data},
});
