import {PostProductState, PostProductActionType} from './types';
import {
    POST_PRODUCTS_DATA_FETCHED,
} from './actions';

const initialState: PostProductState = {
    items: {},
};

export function postProductReducer(state = initialState, action: PostProductActionType): PostProductState {
    const {type, payload} = action;

    switch (type) {
        case POST_PRODUCTS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...payload.data,
                }
            };
    }

    return state;
}
