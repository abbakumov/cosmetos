import {PostExtraState, PostExtraActionType} from './types';
import {
    POST_EXTRA_DATA_FETCHED,
} from './actions';

const initialState: PostExtraState = {
    items: {},
};

export function postExtraReducer(state = initialState, action: PostExtraActionType): PostExtraState {
    const {type, payload} = action;

    switch (type) {
        case POST_EXTRA_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    [payload.data.id]: payload.data,
                }
            };
    }

    return state;
}
