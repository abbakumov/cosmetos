import {BlogLogin} from '../../../../entities/Blog/types';

import {
    PAGE_BLOG_FETCH_SUCCESS,
    PAGE_BLOG_FETCH_MORE,
    PAGE_BLOG_FETCH_MORE_SUCCESS,
    PAGE_BLOG_FETCH_MORE_FAIL,
} from './actions';

export interface PageBlogState {
    blogLogin: BlogLogin
    isFetchingMore: boolean
}

export interface PageBlogFetchSuccessAction {
    type: typeof PAGE_BLOG_FETCH_SUCCESS
    payload: {
        blogLogin: string
    }
}

export interface PageBlogFetchMoreAction {
    type: typeof PAGE_BLOG_FETCH_MORE
}

export interface PageBlogFetchMoreSuccessAction {
    type: typeof PAGE_BLOG_FETCH_MORE_SUCCESS
}

export interface PageBlogFetchMoreFailAction {
    type: typeof PAGE_BLOG_FETCH_MORE_FAIL
}

export type PageBlogAction =
    | PageBlogFetchSuccessAction
    | PageBlogFetchMoreAction
    | PageBlogFetchMoreSuccessAction
    | PageBlogFetchMoreFailAction
    ;
