import {
    BrandState,
    BrandAction,
} from './types';

import {
    BRANDS_DATA_FETCHED,
} from './actions';

const initialState: BrandState = {
    items: {},
};

export function brandReducer(state: BrandState = initialState, action: BrandAction) {
    switch (action.type) {
        case BRANDS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                },
            };
    }

    return state;
}
