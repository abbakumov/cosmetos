import {
    PAGE_BLOG_FETCH_SUCCESS,
    PAGE_BLOG_FETCH_MORE,
    PAGE_BLOG_FETCH_MORE_SUCCESS,
    PAGE_BLOG_FETCH_MORE_FAIL,
} from './actions';

import {
    PageBlogState,
    PageBlogAction,
} from './types';

const initialState: PageBlogState = {
    blogLogin: null,
    isFetchingMore: false,
};

export function pageBlogReducer(state: PageBlogState = initialState, action: PageBlogAction): PageBlogState {
    switch (action.type) {
        case PAGE_BLOG_FETCH_SUCCESS:
            return {
                ...state,
                blogLogin: action.payload.blogLogin || null,
            };

        case PAGE_BLOG_FETCH_MORE:
            return {
                ...state,
                isFetchingMore: true,
            };

        case PAGE_BLOG_FETCH_MORE_SUCCESS:
            return {
                ...state,
                isFetchingMore: false,
            };

        case PAGE_BLOG_FETCH_MORE_FAIL:
            return {
                ...state,
                isFetchingMore: false,
            };
    }

    return state;
}
