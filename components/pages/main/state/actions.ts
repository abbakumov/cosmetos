import {AppState} from '../../../../store';
import {BlogProductId} from '../../../../entities/BlogProduct/types';
import {PostId} from '../../../../entities/Post/types';
import {getMainPosts} from '../../../../entities/Post/api';
import {blogsDataFetchedAction} from '../../../../entities/Blog/actions';
import {postsBaseDataFetchedAction} from '../../../../entities/Post/actions';
import {getMainReviews} from '../../../../entities/BlogProduct/api';

import {
    PageMainFetchSuccessAction,
    PageMainFetchSuccessActionPayload,
    PageMainFetchMoreBlogProductsSuccessAction,
    PageMainFetchMoreBlogProductsFailAction,
    PageMainFetchMorePostsSuccessAction,
    PageMainFetchMorePostsFailAction,
} from './types';
import { productsBaseDataFetchedAction } from '../../../../entities/ProductBase/actions';
import { blogProductsDataFetchedAction } from '../../../../entities/BlogProduct/actions';

export const PAGE_MAIN_FETCH_SUCCESS = 'PAGE_MAIN_FETCH_SUCCESS';
export const PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS = 'PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS';
export const PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_SUCCESS = 'PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_SUCCESS';
export const PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_FAIL = 'PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_FAIL';
export const PAGE_MAIN_FETCH_MORE_POSTS = 'PAGE_MAIN_FETCH_MORE_POSTS';
export const PAGE_MAIN_FETCH_MORE_POSTS_SUCCESS = 'PAGE_MAIN_FETCH_MORE_POSTS_SUCCESS';
export const PAGE_MAIN_FETCH_MORE_POSTS_FAIL = 'PAGE_MAIN_FETCH_MORE_POSTS_FAIL';

export const pageMainFetchSuccessAction = (payload: PageMainFetchSuccessActionPayload): PageMainFetchSuccessAction => ({
    type: PAGE_MAIN_FETCH_SUCCESS,
    payload,
});

export const pageMainFetchMoreBlogProductsAction = () => async (dispatch, getState) => {
    const state: AppState = getState();
    const offset = state.pageMain.blogProductIds.length;

    dispatch({type: PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS});

    try {
        const data = await getMainReviews(offset);
        dispatch(blogProductsDataFetchedAction(data.blogProduct));
        dispatch(blogsDataFetchedAction(data.blog.data, data.blog.currentLogin));
        dispatch(productsBaseDataFetchedAction(data.productBase));
        dispatch(pageMainFetchMoreBlogProductsSuccessAction(data.blogProductIds, data.isMoreAvailable));
    } catch(e) {
        dispatch(pageMainFetchMoreBlogProductsFailAction());
    }
};

export const pageMainFetchMoreBlogProductsSuccessAction =
    (blogProductIds: BlogProductId[], isMoreAvailable: boolean): PageMainFetchMoreBlogProductsSuccessAction => ({
        type: PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_SUCCESS,
        payload: {blogProductIds, isMoreAvailable},
    });

export const pageMainFetchMoreBlogProductsFailAction = (): PageMainFetchMoreBlogProductsFailAction => ({
    type: PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_FAIL,
});

export const pageMainFetchMorePostsAction = () => async (dispatch, getState) => {
    const state: AppState = getState();
    const offset = state.pageMain.postIds.length;

    dispatch({type: PAGE_MAIN_FETCH_MORE_POSTS});

    try {
        const data = await getMainPosts(offset);
        dispatch(blogsDataFetchedAction(data.blog.data, data.blog.currentLogin));
        dispatch(postsBaseDataFetchedAction(data.post));
        dispatch(pageMainFetchMorePostsSuccessAction(data.postIds, data.isMoreAvailable));
    } catch (e) {
        dispatch(pageMainFetchMorePostsFailAction());
    }
};

export const pageMainFetchMorePostsSuccessAction =
    (postIds: PostId[], isMoreAvailable: boolean): PageMainFetchMorePostsSuccessAction => ({
        type: PAGE_MAIN_FETCH_MORE_POSTS_SUCCESS,
        payload: {postIds, isMoreAvailable},
    });

export const pageMainFetchMorePostsFailAction = (): PageMainFetchMorePostsFailAction => ({
    type: PAGE_MAIN_FETCH_MORE_POSTS_FAIL,
});
