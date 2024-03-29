import {
    PagePostState,
    PostPageActionType,
} from './types';

import {
    POST_PAGE_DATA_FETCHED_ACTION,
    POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN,
    POST_PAGE_OPEN_PART,
    POST_PAGE_TOGGLE_PART,
} from './actions';

const initialState = {
    postId: 0,
    openParts: {},
    isPicPartsOpen: false,
}

export function pagePostReducer(state: PagePostState = initialState, action: PostPageActionType): PagePostState {
    switch (action.type) {
        case POST_PAGE_DATA_FETCHED_ACTION:
            return {
                ...state,
                postId: action.payload.id,
            };

        case POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN:
            return {
                ...state,
                isPicPartsOpen: !state.isPicPartsOpen,
            };
        
        case POST_PAGE_OPEN_PART:
            return {
                ...state,
                openParts: {
                    [action.payload.id]: true,
                },
            };

        case POST_PAGE_TOGGLE_PART:
            return {
                ...state,
                openParts: {
                    ...state.openParts,
                    [action.payload.id]: !state.openParts[action.payload.id],
                },
            };
    }

    return state;
}
