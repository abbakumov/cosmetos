import {
    PagePostEditState,
    PagePostEditActionType,
} from './types';

import {
    POST_EDIT_PAGE_DATA_FETCHED,
    POST_EDIT_START_ADD_PRODUCT,
    POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE,
    POST_EDIT_PRODUCT_BRAND_CHANGE,
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

        case POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE:
            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    [action.payload.fieldName]: action.payload.value,
                }
            };

        case POST_EDIT_PRODUCT_BRAND_CHANGE:
            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    brandId: action.payload.id,
                }
            };
    }

    return state;
}
