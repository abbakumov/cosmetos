import {BlogExtra, BlogExtraDataFetchedAction} from './types';

export const BLOG_EXTRA_DATA_FETCHED = 'BLOG_EXTRA_DATA_FETCHED';

export const blogExtraDataFetchedAction = (data: BlogExtra): BlogExtraDataFetchedAction => ({
    type: BLOG_EXTRA_DATA_FETCHED,
    payload: {data},
});
