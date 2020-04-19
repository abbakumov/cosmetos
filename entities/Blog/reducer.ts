import {PAGE_BLOG_SAVE_SUCCESS} from '../../components/pages/blog/state/actions';
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

        case PAGE_BLOG_SAVE_SUCCESS:
            const item = state.items[action.payload.blogLogin];
            const newItem = {
                ...item,
                name: action.payload.newName,
                imageUrl: action.payload.newImageUrl,
            };

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.blogLogin]: newItem,
                },
            };
    }

    return state;
}
