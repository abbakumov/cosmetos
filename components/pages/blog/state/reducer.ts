import {
    PAGE_BLOG_FETCH_SUCCESS,
    PAGE_BLOG_FETCH_MORE,
    PAGE_BLOG_FETCH_MORE_SUCCESS,
    PAGE_BLOG_FETCH_MORE_FAIL,
    PAGE_BLOG_EDIT,
    PAGE_BLOG_EDIT_CANCEL,
    PAGE_BLOG_CHANGE_FIELD,
    PAGE_BLOG_CHANGE_IMAGE_FILE,
    PAGE_BLOG_SAVE,
    PAGE_BLOG_SAVE_SUCCESS,
    PAGE_BLOG_SAVE_FAIL,
} from './actions';

import {
    PageBlogState,
    PageBlogAction,
} from './types';

const emptyEdit = {
    isActive: false,
    newImageFile: null,
    newImageUrl: '',
    newName: '',
    newInstagramLogin: '',
    newBio: '',
};

const initialState: PageBlogState = {
    blogLogin: null,
    isFetchingMore: false,
    edit: emptyEdit,
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

        case PAGE_BLOG_EDIT:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    isActive: true,
                }
            };

        case PAGE_BLOG_EDIT_CANCEL:
            return {
                ...state,
                edit: emptyEdit,
            };

        case PAGE_BLOG_CHANGE_FIELD:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    [action.payload.field]: action.payload.value,
                },
            };

        case PAGE_BLOG_CHANGE_IMAGE_FILE:
            return {
                ...state,
                edit: {
                    ...state.edit,
                    newImageFile: action.payload.file,
                    newImageUrl: action.payload.url,
                },
            };

        case PAGE_BLOG_SAVE:
            return state;

        case PAGE_BLOG_SAVE_SUCCESS:
            return {
                ...state,
                edit: emptyEdit,
            };

        case PAGE_BLOG_SAVE_FAIL:
            return state;
    }

    return state;
}
