import {BrandProductsState, BrandProductsAction} from './types';

import {
    BRAND_PRODUCTS_DATA_FETCHED
} from './actions';

const initialState: BrandProductsState = {
    items: {},
};

export function brandProductsReducer(state: BrandProductsState = initialState, action: BrandProductsAction) {
    switch (action.type) {
        case BRAND_PRODUCTS_DATA_FETCHED:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.data.id]: action.payload.data,
                },
            };
    }

    return state;
}
