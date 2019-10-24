import {BlogExtraState, BlogExtraActionType} from './types';
import {
    BLOG_EXTRA_DATA_FETCHED,
} from './actions';

const initialState: BlogExtraState = {
    items: {},
};

export function blogExtraReducer(state = initialState, action: BlogExtraActionType): BlogExtraState {
    const {type, payload} = action;

    switch (type) {
        case BLOG_EXTRA_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    [payload.data.login]: payload.data,
                }
            };
    }

    return state;
}
