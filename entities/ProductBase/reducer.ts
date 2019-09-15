import {ProductBaseState, ProductBaseActionType} from './types';
import {
    PRODUCTS_BASE_DATA_FETCHED,
} from './actions';

const initialState: ProductBaseState = {
    items: {},
};

export function productBaseReducer(state = initialState, action: ProductBaseActionType): ProductBaseState {
    const {type, payload} = action;

    switch (type) {
        case PRODUCTS_BASE_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...payload.data,
                }
            };
    }

    return state;
}
