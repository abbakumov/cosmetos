import {
    PagePostEditState,
    PagePostEditActionType,
} from './types';

import {
    POST_EDIT_PAGE_DATA_FETCHED,
    POST_EDIT_START_ADD_PRODUCT,
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
        brandText: '',
        brandId: null,
        productText: '',
        productId: null,
        productColorText: '',
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

        case POST_EDIT_START_ADD_PRODUCT:
            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    postPartId: action.payload.partId,
                }
            };
    }

    return state;
}
