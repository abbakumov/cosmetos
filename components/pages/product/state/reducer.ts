import {
    PageProductState,
    PageProductAction,
} from './types';

import {
    PAGE_PRODUCT_DATA_FETCHED,
} from './actions';

const initialState: PageProductState = {
    refPost: null,
};

export function pageProductReducer(state: PageProductState = initialState, action: PageProductAction): PageProductState {
    switch (action.type) {
        case PAGE_PRODUCT_DATA_FETCHED:
            return {
                ...state,
                refPost: action.payload.refPost || null,
            };
    }

    return state;
}
