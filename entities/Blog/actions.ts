import {
    Blog,
    BlogLogin,
    BlogMap,
    BlogDataFetchedAction,
    BlogsDataFetchedAction,
} from './types';

export const BLOG_DATA_FETCHED = 'BLOG_DATA_FETCHED';
export const BLOGS_DATA_FETCHED = 'BLOGS_DATA_FETCHED';

export const blogDataFetchedAction = (data: Blog): BlogDataFetchedAction => ({
    type: BLOG_DATA_FETCHED,
    payload: {
        data,
    },
});

export const blogsDataFetchedAction = (data: BlogMap, currentLogin?: BlogLogin): BlogsDataFetchedAction => ({
    type: BLOGS_DATA_FETCHED,
    payload: {
        data,
        currentLogin,
    }
});
