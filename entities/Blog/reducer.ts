import {BlogState, BlogActionType} from './types';
import {
    BLOG_DATA_FETCHED,
    BLOGS_DATA_FETCHED,
} from './actions';

const initialState: BlogState = {
    items: {},
    currentLogin: null,
};

export function blogReducer(state = initialState, action: BlogActionType): BlogState {

    switch (action.type) {
        case BLOG_DATA_FETCHED:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.data.login]: action.payload.data,
                }
            };

        case BLOGS_DATA_FETCHED:
            return {
                ...state,
                items: {
                    ...state.items,
                    ...action.payload.data,
                },
                currentLogin: action.payload.currentLogin || null,
            };
    }

    return state;
}
