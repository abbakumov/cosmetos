import {BlogLogin} from '../../../../entities/Blog/types';

import {
    PAGE_BLOG_FETCH_SUCCESS,
} from './actions';

export interface PageBlogState {
    blogLogin: BlogLogin
}

export interface PageBlogFetchSuccessAction {
    type: typeof PAGE_BLOG_FETCH_SUCCESS
    payload: {
        blogLogin: string
    }
}

export type PageBlogAction =
    | PageBlogFetchSuccessAction
    ;
