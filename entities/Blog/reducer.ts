import {BlogState, BlogActionType} from './types';
import {
    BLOG_DATA_FETCHED,
} from './actions';

const initialState: BlogState = {
    items: {},
};

export function blogReducer(state = initialState, action: BlogActionType): BlogState {
    const {type, payload} = action;

    switch (type) {
        case BLOG_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    [payload.data.login]: payload.data,
                }
            };
    }

    return state;
}
