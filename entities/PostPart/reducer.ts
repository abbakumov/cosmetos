import {PostPartState, PostPartActionType} from './types';
import {
    POST_PARTS_DATA_FETCHED,
} from './actions';

const initialState: PostPartState = {
    items: {},
};

export function postPartReducer(state = initialState, action: PostPartActionType): PostPartState {
    const {type, payload} = action;

    switch (type) {
        case POST_PARTS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...payload.data,
                }
            };
    }

    return state;
}
