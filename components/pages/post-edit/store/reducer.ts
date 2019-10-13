import {
    PagePostEditState,
    PagePostEditActionType,
} from './types';

import {
    POST_EDIT_PAGE_DATA_FETCHED,
    POST_EDIT_START_ADD_PRODUCT,
    POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE,
    POST_EDIT_PRODUCT_BRAND_CHANGE,
    POST_EDIT_PRODUCT_PRODUCT_CHANGE,
    POST_EDIT_PRODUCT_COLOR_CHANGE,
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
            const {fieldName} = action.payload;

            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    [fieldName]: action.payload.value,
                    // TODO: clean up right!
                    brandId: (
                        fieldName === 'brandText'
                            ? null
                            : state.editPostPartProduct.brandId
                    ),
                    productId: (
                        ['brandText', 'productText'].includes(fieldName)
                            ? null
                            : state.editPostPartProduct.productId
                    ),
                    productColorId: (
                        ['brandText', 'productText', 'colorText'].includes(fieldName)
                            ? null
                            : state.editPostPartProduct.productColorId
                    ),
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

        case POST_EDIT_PRODUCT_PRODUCT_CHANGE:
            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    productId: action.payload.id,
                }
            };

        case POST_EDIT_PRODUCT_COLOR_CHANGE:
            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    productColorId: action.payload.colorId,
                }
            }
    }

    return state;
}
