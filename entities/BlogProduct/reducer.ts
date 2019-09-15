import {BlogProductState, BlogProductActionType} from './types';
import {
    BLOG_PRODUCTS_DATA_FETCHED,
} from './actions';

const initialState: BlogProductState = {
    items: {},
};

export function blogProductReducer(state = initialState, action: BlogProductActionType): BlogProductState {
    const {type, payload} = action;

    switch (type) {
        case BLOG_PRODUCTS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...payload.data,
                }
            };
    }

    return state;
}
