import {PostBaseState, PostBaseActionType} from './types';
import {
    POSTS_BASE_DATA_FETCHED,
} from './actions';

const initialState: PostBaseState = {
    items: {},
};

export function postBaseReducer(state = initialState, action: PostBaseActionType): PostBaseState {
    const {type, payload} = action;

    switch (type) {
        case POSTS_BASE_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...payload.data,
                }
            };
    }

    return state;
}
