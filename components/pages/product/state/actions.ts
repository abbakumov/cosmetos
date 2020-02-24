import {PostId} from '../../../../entities/Post/types';
import {ProductColorId} from '../../../../entities/ProductColor/types';
import {ProductId} from '../../../../entities/ProductBase/types';
import {AppState} from '../../../../store';

import {
    PageProductDataFetchedAction,
    PageProductEditCommentAction,
    PageProductEditCommentCancelAction,
    PageProductCommentChangeAction,
    PageProductSaveCommentAction,
    PageProductSaveCommentSuccessAction,
    PageProductSaveCommentFailAction,
    PageProductDeleteCommentAction,
} from './types';

export const PAGE_PRODUCT_DATA_FETCHED = 'PAGE_PRODUCT_DATA_FETCHED';
export const PAGE_PRODUCT_SHOW_COLOR = 'PAGE_PRODUCT_SHOW_COLOR';
export const PAGE_PRODUCT_HIDE_COLOR = 'PAGE_PRODUCT_HIDE_COLOR';
export const PAGE_PRODUCT_EDIT_COMMENT = 'PAGE_PRODUCT_EDIT_COMMENT';
export const PAGE_PRODUCT_EDIT_COMMENT_CANCEL = 'PAGE_PRODUCT_EDIT_COMMENT_CANCEL';
export const PAGE_PRODUCT_COMMENT_CHANGE = 'PAGE_PRODUCT_COMMENT_CHANGE';
export const PAGE_PRODUCT_SAVE_COMMENT = 'PAGE_PRODUCT_SAVE_COMMENT';
export const PAGE_PRODUCT_SAVE_COMMENT_SUCCESS = 'PAGE_PRODUCT_SAVE_COMMENT_SUCCESS';
export const PAGE_PRODUCT_SAVE_COMMENT_FAIL = 'PAGE_PRODUCT_SAVE_COMMENT_FAIL';
export const PAGE_PRODUCT_DELETE_COMMENT = 'PAGE_PRODUCT_DELETE_COMMENT';

let lastHideTimeout = 0;

export const pageProductDataFetchedAction = (id: ProductId, refPost: PostId): PageProductDataFetchedAction => ({
    type: PAGE_PRODUCT_DATA_FETCHED,
    payload: {id, refPost},
});

export const pageProductShowColorAction = (colorId: ProductColorId) => (dispatch, getState) => {
    dispatch({
        type: PAGE_PRODUCT_SHOW_COLOR,
        payload: {colorId},
    });

    // no need in previous timer
    clearTimeout(lastHideTimeout);

    lastHideTimeout = window.setTimeout(
        () => {
            const state: AppState = getState();
            if (state.pageProduct.activeColorId === colorId) { // just to be sure
                dispatch(pageProductHideColorAction());
            }
        },
        8000
    );
};

export const pageProductHideColorAction = () => ({
    type: PAGE_PRODUCT_HIDE_COLOR,
});

export const pageProductEditCommentAction = (text?: string): PageProductEditCommentAction => ({
    type: PAGE_PRODUCT_EDIT_COMMENT,
    payload: {text}
});

export const pageProductEditCommentCancelAction = (): PageProductEditCommentCancelAction => ({
    type: PAGE_PRODUCT_EDIT_COMMENT_CANCEL,
});

export const pageProductCommentChangeAction = (text): PageProductCommentChangeAction => ({
    type: PAGE_PRODUCT_COMMENT_CHANGE,
    payload: {text},
});

// PageProductSaveCommentAction
// PageProductSaveCommentSuccessAction
// PageProductSaveCommentFailAction
// PageProductDeleteCommentAction
