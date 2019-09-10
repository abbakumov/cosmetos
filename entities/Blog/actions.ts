import {Blog, BlogDataFetchedAction} from './types';

export const BLOG_DATA_FETCHED = 'BLOG_DATA_FETCHED';

export const blogDataFetchedAction = (data: Blog): BlogDataFetchedAction => ({
    type: BLOG_DATA_FETCHED,
    payload: {
        data,
    },
});
