import {PostPartMap, PostPartsDataFetchedAction} from './types';

export const POST_PARTS_DATA_FETCHED = 'POSTS_PARTS_DATA_FETCHED';

export const postPartsDataFetchedAction = (data: PostPartMap): PostPartsDataFetchedAction => ({
    type: POST_PARTS_DATA_FETCHED,
    payload: {data},
});

