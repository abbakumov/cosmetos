import {BlogProductId} from '../../../../entities/BlogProduct/types';
import {PostId} from '../../../../entities/Post/types';

import {
    PageMainFetchSuccessAction,
    PageMainFetchSuccessActionPayload,
    PageMainFetchMoreBlogProductsAction,
    PageMainFetchMoreBlogProductsSuccessAction,
    PageMainFetchMoreBlogProductsFailAction,
    PageMainFetchMorePostsAction,
    PageMainFetchMorePostsSuccessAction,
    PageMainFetchMorePostsFailAction,
} from './types';

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

export const pageMainFetchMoreBlogProductsAction = (): PageMainFetchMoreBlogProductsAction => ({
    type: PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS,
});

export const pageMainFetchMoreBlogProductsSuccessAction =
    (blogProductIds: BlogProductId[]): PageMainFetchMoreBlogProductsSuccessAction => ({
        type: PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_SUCCESS,
        payload: {blogProductIds},
    });

export const pageMainFetchMoreBlogProductsFailAction = (): PageMainFetchMoreBlogProductsFailAction => ({
    type: PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_FAIL,
});

export const pageMainFetchMorePostsAction = (): PageMainFetchMorePostsAction => ({
    type: PAGE_MAIN_FETCH_MORE_POSTS,
});

export const pageMainFetchMorePostsSuccessAction =
    (postIds: PostId[]): PageMainFetchMorePostsSuccessAction => ({
        type: PAGE_MAIN_FETCH_MORE_POSTS_SUCCESS,
        payload: {postIds},
    });

export const pageMainFetchMorePostsFailAction = (): PageMainFetchMorePostsFailAction => ({
    type: PAGE_MAIN_FETCH_MORE_POSTS_FAIL,
});
