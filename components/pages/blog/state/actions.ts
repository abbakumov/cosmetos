import {BlogLogin} from '../../../../entities/Blog/types';

import {
    PageBlogFetchSuccessAction,
} from './types';

export const PAGE_BLOG_FETCH_SUCCESS = 'PAGE_BLOG_FETCH_SUCCESS';

export const pageBlogFetchSuccessAction = (blogLogin: BlogLogin): PageBlogFetchSuccessAction => ({
    type: PAGE_BLOG_FETCH_SUCCESS,
    payload: {blogLogin},
});
