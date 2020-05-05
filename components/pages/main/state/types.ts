import {BlogLogin} from '../../../../entities/Blog/types';
import {BlogProductId} from '../../../../entities/BlogProduct/types';
import {PostId} from '../../../../entities/Post/types';

import {
    PAGE_MAIN_FETCH_SUCCESS,
    PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS,
    PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_SUCCESS,
    PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_FAIL,
    PAGE_MAIN_FETCH_MORE_POSTS,
    PAGE_MAIN_FETCH_MORE_POSTS_SUCCESS,
    PAGE_MAIN_FETCH_MORE_POSTS_FAIL,
} from './actions';

export interface PageMainFetchSuccessActionPayload {
    blogLogins: BlogLogin[]
    blogProductIds: BlogProductId[]
    postIds: PostId[]
}
export interface PageMainFetchSuccessAction {
    type: typeof PAGE_MAIN_FETCH_SUCCESS
    payload: PageMainFetchSuccessActionPayload
}

export interface PageMainFetchMoreBlogProductsAction {
    type: typeof PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS
}

export interface PageMainFetchMoreBlogProductsSuccessAction {
    type: typeof PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_SUCCESS
    payload: {
        blogProductIds: BlogProductId[]
        isMoreAvailable: boolean
    }
}

export interface PageMainFetchMoreBlogProductsFailAction {
    type: typeof PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_FAIL
}

export interface PageMainFetchMorePostsAction {
    type: typeof PAGE_MAIN_FETCH_MORE_POSTS
}

export interface PageMainFetchMorePostsSuccessAction {
    type: typeof PAGE_MAIN_FETCH_MORE_POSTS_SUCCESS
    payload: {
        postIds: PostId[]
        isMoreAvailable: boolean
    }
}

export interface PageMainFetchMorePostsFailAction {
    type: typeof PAGE_MAIN_FETCH_MORE_POSTS_FAIL
}

export type PageMainAction =
    | PageMainFetchSuccessAction
    | PageMainFetchMoreBlogProductsAction
    | PageMainFetchMoreBlogProductsSuccessAction
    | PageMainFetchMoreBlogProductsFailAction
    | PageMainFetchMorePostsAction
    | PageMainFetchMorePostsSuccessAction
    | PageMainFetchMorePostsFailAction
    ;

export interface PageMainState {
    blogLogins: BlogLogin[]
    blogProductIds: BlogProductId[]
    postIds: PostId[]
    isFetchingMoreBlogProducts: boolean
    isFetchingMoreBlogProductsAvailable: boolean
    isFetchingMorePosts: boolean
    isFetchingMorePostsAvailable: boolean
}
