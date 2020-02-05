import {BlogExtraState, BlogExtraActionType, BlogExtra} from './types';
import {
    BLOG_EXTRA_DATA_FETCHED,
    BLOG_EXTRA_MORE_POSTS_FETCHED,
} from './actions';

const initialState: BlogExtraState = {
    items: {},
};

export function blogExtraReducer(state = initialState, action: BlogExtraActionType): BlogExtraState {
    switch (action.type) {
        case BLOG_EXTRA_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    [action.payload.data.login]: action.payload.data,
                }
            };

        case BLOG_EXTRA_MORE_POSTS_FETCHED:
            const blogItem = state.items[action.payload.login] as BlogExtra;
            const newBlogItem: BlogExtra = {
                ...blogItem,
                postIds: [...blogItem.postIds, ...action.payload.postIds],
            };

            return {
                ...state,
                items: {
                    ...state.items,
                    [newBlogItem.login]: newBlogItem,
                },
            };
    }

    return state;
}
