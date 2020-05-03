import _ from 'lodash';

import {
    PAGE_MAIN_FETCH_SUCCESS,
    PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS,
    PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_SUCCESS,
    PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_FAIL,
    PAGE_MAIN_FETCH_MORE_POSTS,
    PAGE_MAIN_FETCH_MORE_POSTS_SUCCESS,
    PAGE_MAIN_FETCH_MORE_POSTS_FAIL,
} from './actions';

import {
    PageMainAction,
    PageMainState,
} from './types';

const initialState: PageMainState = {
    blogLogins: [],
    blogProductIds: [],
    postIds: [],
    isFetchingMoreBlogProducts: false,
    isFetchingMorePosts: false,
};

export const pageMainReducer = (state: PageMainState = initialState, action: PageMainAction) => {
    switch (action.type) {
        case PAGE_MAIN_FETCH_SUCCESS:
            return {
                ...state,
                ..._.pick(action.payload, ['blogLogins', 'blogProductIds', 'postIds']),
            };

        case PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS:
            return {
                ...state,
                isFetchingMoreBlogProducts: true,
            };

        case PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_SUCCESS:
            return {
                ...state,
                isFetchingMoreBlogProducts: false,
                blogProductIds: [...state.blogProductIds, ...action.payload.blogProductIds],
            };

        case PAGE_MAIN_FETCH_MORE_BLOG_PRODUCTS_FAIL:
            return {
                ...state,
                isFetchingMoreBlogProducts: false,
            };

        case PAGE_MAIN_FETCH_MORE_POSTS:
            return {
                ...state,
                isFetchingMorePosts: true,
            };

        case PAGE_MAIN_FETCH_MORE_POSTS_SUCCESS:
            return {
                ...state,
                isFetchingMorePosts: false,
                postIds: [...state.postIds, action.payload.postIds],
            };

        case PAGE_MAIN_FETCH_MORE_POSTS_FAIL:
            return {
                ...state,
                isFetchingMorePosts: false,
            };
    }

    return state;
};
