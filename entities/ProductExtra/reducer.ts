import {ProductExtraActionType, ProductExtraState} from './types';
import {
    PRODUCT_EXTRA_DATA_FETCHED,
} from './actions';

const initialState: ProductExtraState = {
    items: {},
};

export function productExtraReducer(state = initialState, action: ProductExtraActionType): ProductExtraState {

    switch (action.type) {
        case PRODUCT_EXTRA_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    [action.payload.data.id]: action.payload.data,
                }
            };
    }

    return state;
}
