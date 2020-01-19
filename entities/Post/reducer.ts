import {POST_PAGE_PUBLISH_SUCCESS} from '../../components/pages/post/state/actions';

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
                },
            };

        case POSTS_BASE_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                },
            };

        case POST_PAGE_PUBLISH_SUCCESS:
            const item = state.items[action.payload.id];
            if (!item) {
                return state;
            }

            const newItem = {
                ...item,
                isPublic: true,
            };

            return {
                items: {
                    ...state.items,
                    [newItem.id]: newItem,
                },
            };
    }

    return state;
}
