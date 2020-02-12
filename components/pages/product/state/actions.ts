import {PostId} from '../../../../entities/Post/types';
import {ProductColorId} from '../../../../entities/ProductColor/types';
import {AppState} from '../../../../store';

import {
    PageProductDataFetchedAction,
    PageProductHideColorAction,
} from './types';

export const PAGE_PRODUCT_DATA_FETCHED = 'PAGE_PRODUCT_DATA_FETCHED';
export const PAGE_PRODUCT_SHOW_COLOR = 'PAGE_PRODUCT_SHOW_COLOR';
export const PAGE_PRODUCT_HIDE_COLOR = 'PAGE_PRODUCT_HIDE_COLOR';

let lastHideTimeout = 0;

export const pageProductDataFetchedAction = (refPost: PostId): PageProductDataFetchedAction => ({
    type: PAGE_PRODUCT_DATA_FETCHED,
    payload: {refPost},
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
