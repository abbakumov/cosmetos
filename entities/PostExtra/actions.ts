import {PostExtra, PostExtraDataFetchedAction} from './types';

export const POST_EXTRA_DATA_FETCHED = 'POST_EXTRA_DATA_FETCHED';

export const postsExtraDataFetchedAction = (data: PostExtra): PostExtraDataFetchedAction => ({
    type: POST_EXTRA_DATA_FETCHED,
    payload: {data},
});
