import {
    UnProductExtraState,
    UnProductExtraAction,
} from './types';

import {
    UN_PRODUCTS_EXTRA_DATA_FETCHED
} from './actions';

const initialState: UnProductExtraState = {
    items: {},
}

export function unProductExtraReducer(state: UnProductExtraState = initialState, action: UnProductExtraAction): UnProductExtraState {
    switch (action.type) {
        case UN_PRODUCTS_EXTRA_DATA_FETCHED:
            return {
                ...state,
                items: {
                    ...state.items,
                    ...action.payload.data,
                },
            };
    }

    return state;
}
