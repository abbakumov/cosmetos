import {PostPartProductState, PostPartProductAction} from './types';
import {
    POST_PART_PRODUCTS_DATA_FETCHED,
} from './actions';

const initialState: PostPartProductState = {
    items: {},
};

export function postPartProductReducer(state = initialState, action: PostPartProductAction): PostPartProductState {
    switch (action.type) {
        case POST_PART_PRODUCTS_DATA_FETCHED:
            return {
                ...state,
                items: {
                    ...state.items,
                },
            };
    }

    return state;
}
