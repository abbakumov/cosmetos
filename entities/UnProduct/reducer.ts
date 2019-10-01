import {
    UnProductState,
    UnProductAction,
} from './types';

import {
    UN_PRODUCTS_DATA_FETCHED,
} from './actions';

const initialState: UnProductState = {
    items: {},
};

export function unProductReducer(state: UnProductState = initialState, action: UnProductAction) {
    switch (action.type) {
        case UN_PRODUCTS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                },
            };
    }

    return state;
}
