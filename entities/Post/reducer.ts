import {PostBaseState, PostBaseActionType} from './types';
import {
    POST_BASE_DATA_FETCHED,
    POSTS_BASE_DATA_FETCHED,
} from './actions';

const initialState: PostBaseState = {
    items: {},
};

export function postBaseReducer(state = initialState, action: PostBaseActionType): PostBaseState {
    switch (action.type) {
        case POST_BASE_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    [action.payload.data.id]: action.payload.data,
                }
            };

        case POSTS_BASE_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                }
            };
    }

    return state;
}
