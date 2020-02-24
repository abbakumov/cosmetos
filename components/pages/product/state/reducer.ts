import {
    PageProductState,
    PageProductAction,
} from './types';

import {
    PAGE_PRODUCT_DATA_FETCHED,
    PAGE_PRODUCT_SHOW_COLOR,
    PAGE_PRODUCT_HIDE_COLOR,
    PAGE_PRODUCT_EDIT_COMMENT,
    PAGE_PRODUCT_EDIT_COMMENT_CANCEL,
    PAGE_PRODUCT_COMMENT_CHANGE,
    PAGE_PRODUCT_SAVE_COMMENT,
    PAGE_PRODUCT_SAVE_COMMENT_SUCCESS,
    PAGE_PRODUCT_SAVE_COMMENT_FAIL,
} from './actions';

const emptyComment = {
    text: '',
    isSaving: false,
};

const initialState: PageProductState = {
    id: null,
    refPost: null,
    activeColorId: null,
    commentEdit: null,
};

export function pageProductReducer(state: PageProductState = initialState, action: PageProductAction): PageProductState {
    switch (action.type) {
        case PAGE_PRODUCT_DATA_FETCHED:
            return {
                ...state,
                id: action.payload.id,
                refPost: action.payload.refPost || null,
            };

        case PAGE_PRODUCT_SHOW_COLOR:
            return {
                ...state,
                activeColorId: action.payload.colorId,
            };

        case PAGE_PRODUCT_HIDE_COLOR:
            return {
                ...state,
                activeColorId: null,
            };

        case PAGE_PRODUCT_EDIT_COMMENT:
            return {
                ...state,
                commentEdit: {
                    ...emptyComment,
                    text: action.payload.text || '', // add text to payload
                },
            };

        case PAGE_PRODUCT_EDIT_COMMENT_CANCEL:
            return {
                ...state,
                commentEdit: null,
            };

        case PAGE_PRODUCT_COMMENT_CHANGE:
            return {
                ...state,
                commentEdit: {
                    ...state.commentEdit,
                    text: action.payload.text,
                }
            };
        
        case PAGE_PRODUCT_SAVE_COMMENT:
            return {
                ...state,
                commentEdit: {
                    ...state.commentEdit,
                    isSaving: true,
                },
            };

        case PAGE_PRODUCT_SAVE_COMMENT_SUCCESS:
            return {
                ...state,
                commentEdit: null,
            };

        case PAGE_PRODUCT_SAVE_COMMENT_FAIL:
            return {
                ...state,
                commentEdit: {
                    ...state.commentEdit,
                    isSaving: true,
                },
            };
    }

    return state;
}
