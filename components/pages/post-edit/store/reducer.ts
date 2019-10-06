import {
    PagePostEditState,
    PagePostEditActionType,
} from './types';

import {
    POST_EDIT_PAGE_DATA_FETCHED
} from './actions';

const initialState: PagePostEditState = {
    postEdit: {
        title: '',
        imageUrl: '',
        instaUrl: '',
        description: '',
    },
    postPartIds: [],
    editPostPart: null,
    editPostPartProduct: {
        postPartId: null,
        brandId: null,
        productId: null,
        productColorId: null,
    },
}

export function pagePostEditReducer(state: PagePostEditState = initialState, action: PagePostEditActionType): PagePostEditState {
    switch (action.type) {
        case POST_EDIT_PAGE_DATA_FETCHED:
            return {
                ...state,
                ...action.payload,
            };
    }

    return state;
}
