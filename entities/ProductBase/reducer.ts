import {ProductBaseState, ProductBaseActionType} from './types';
import {
    PRODUCT_BASE_DATA_FETCHED,
    PRODUCTS_BASE_DATA_FETCHED,
} from './actions';

const initialState: ProductBaseState = {
    items: {},
};

export function productBaseReducer(state: ProductBaseState = initialState, action: ProductBaseActionType): ProductBaseState {

    switch (action.type) {
        case PRODUCT_BASE_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    [action.payload.data.id]: action.payload.data,
                }
            };

        case PRODUCTS_BASE_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                }
            };
    }

    return state;
}
