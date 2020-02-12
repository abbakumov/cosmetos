import {
    PageProductState,
    PageProductAction,
} from './types';

import {
    PAGE_PRODUCT_DATA_FETCHED,
    PAGE_PRODUCT_SHOW_COLOR,
    PAGE_PRODUCT_HIDE_COLOR,
} from './actions';

const initialState: PageProductState = {
    refPost: null,
    activeColorId: null,
};

export function pageProductReducer(state: PageProductState = initialState, action: PageProductAction): PageProductState {
    switch (action.type) {
        case PAGE_PRODUCT_DATA_FETCHED:
            return {
                ...state,
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
    }

    return state;
}
