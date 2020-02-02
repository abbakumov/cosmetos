import {
    PAGE_BLOG_FETCH_SUCCESS,
} from './actions';

import {
    PageBlogState,
    PageBlogAction,
} from './types';

const initialState: PageBlogState = {
    blogLogin: null,
};

export function pageBlogReducer(state: PageBlogState = initialState, action: PageBlogAction): PageBlogState {
    switch (action.type) {
        case PAGE_BLOG_FETCH_SUCCESS:
            return {
                ...state,
                blogLogin: action.payload.blogLogin || null,
            };
    }

    return state;
}
