import {
    Blog,
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

export interface BlogMap {
    [id: number]: Blog;
}

export const blogsDataFetchedAction = (data: BlogMap): BlogsDataFetchedAction => ({
    type: BLOGS_DATA_FETCHED,
    payload: {
        data,
    }
});
