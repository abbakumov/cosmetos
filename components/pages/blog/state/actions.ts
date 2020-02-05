import {BlogLogin} from '../../../../entities/Blog/types';
import {getBlogByName} from '../../../../entities/Blog/api';
import {BlogExtra} from '../../../../entities/BlogExtra/types';
import {postsBaseDataFetchedAction} from '../../../../entities/Post/actions';
import {blogExtraMorePostsFetchedAction} from '../../../../entities/BlogExtra/actions';
import {AppState} from '../../../../store';

import {
    PageBlogFetchSuccessAction,
    PageBlogFetchMoreSuccessAction,
    PageBlogFetchMoreFailAction,
} from './types';

export const PAGE_BLOG_FETCH_SUCCESS = 'PAGE_BLOG_FETCH_SUCCESS';
export const PAGE_BLOG_FETCH_MORE = 'PAGE_BLOG_FETCH_MORE';
export const PAGE_BLOG_FETCH_MORE_SUCCESS = 'PAGE_BLOG_FETCH_MORE_SUCCESS';
export const PAGE_BLOG_FETCH_MORE_FAIL = 'PAGE_BLOG_FETCH_MORE_FAIL';

export const pageBlogFetchSuccessAction = (blogLogin: BlogLogin): PageBlogFetchSuccessAction => ({
    type: PAGE_BLOG_FETCH_SUCCESS,
    payload: {blogLogin},
});

export const pageBlogFetchMoreAction = () => async (dispatch, getState) => {
    const state: AppState = getState();
    const {blogLogin} = state.pageBlog;
    const blogExtra = state.blogExtra.items[blogLogin] as BlogExtra;
    const postsCount = blogExtra.postIds.length;

    dispatch({type: PAGE_BLOG_FETCH_MORE});
    try {
        const {blogExtra, postsBase} = await getBlogByName(blogLogin, postsCount);
        const {postIds} = blogExtra;
        dispatch(postsBaseDataFetchedAction(postsBase));
        dispatch(blogExtraMorePostsFetchedAction(blogLogin, postIds));
        dispatch(pageBlogFetchMoreSuccessAction());
    } catch (e) {
        dispatch(pageBlogFetchMoreFailAction());
    }
};

const pageBlogFetchMoreSuccessAction = (): PageBlogFetchMoreSuccessAction => ({
    type: PAGE_BLOG_FETCH_MORE_SUCCESS,
});

const pageBlogFetchMoreFailAction = (): PageBlogFetchMoreFailAction => ({
    type: PAGE_BLOG_FETCH_MORE_FAIL,
});
