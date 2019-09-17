import {ProductColor, ProductColorActionType, ProductColorState} from './types';
import {
    PRODUCT_COLORS_DATA_FETCHED,
} from './actions';

const initialState: ProductColorState = {
    items: {},
};

export function productBaseReducer(state = initialState, action: ProductColorActionType): ProductColorState {

    switch (action.type) {
        case PRODUCT_COLORS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                }
            };
    }

    return state;
}
