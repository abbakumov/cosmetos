import {
    PagePostEditState,
    PagePostEditActionType,
} from './types';

import {
    POST_EDIT_PAGE_DATA_FETCHED,
    POST_EDIT_FILE_CHANGE,
    POST_EDIT_FIELD_CHANGE,
    POST_EDIT_IS_PUBLIC_CHANGE,
    POST_EDIT_SAVE_SUCCESS,
    POST_EDIT_SAVE_FAIL,
    POST_EDIT_START_ADD_PRODUCT,
    POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE,
    POST_EDIT_PRODUCT_BRAND_CHANGE,
    POST_EDIT_PRODUCT_PRODUCT_CHANGE,
    POST_EDIT_PRODUCT_COLOR_CHANGE,
    POST_EDIT_PRODUCT_CANCEL,
    POST_EDIT_PRODUCT_SAVE_SUCCESS,
    POST_EDIT_PART_NEW,
    POST_EDIT_PART_EDIT,
    POST_EDIT_PART_CHANGE_FIELD,
    POST_EDIT_PART_CHANGE_POSITION,
    POST_EDIT_PART_SAVE,
    POST_EDIT_PART_SAVE_SUCCESS,
    POST_EDIT_PART_SAVE_FAIL,
    POST_EDIT_PART_CANCEL,
    POST_EDIT_PART_REMOVE,
    POST_EDIT_PART_REMOVE_SUCCESS,
    POST_EDIT_PART_REMOVE_FAIL,
} from './actions';

const emptyEditPostPartProduct = {
    postPartId: null,
    brandText: '',
    brandId: null,
    productText: '',
    productId: null,
    productColorText: '',
    productColorId: null,
};

const initialState: PagePostEditState = {
    postEdit: {
        title: '',
        imageUrl: '',
        pictureFile: null,
        instaPostId: '',
        description: '',
        isPublic: false,
    },
    postPartIds: [],
    editPostPart: null,
    editPostPartProduct: emptyEditPostPartProduct,
};

export function pagePostEditReducer(state: PagePostEditState = initialState, action: PagePostEditActionType): PagePostEditState {
    switch (action.type) {
        case POST_EDIT_PAGE_DATA_FETCHED:
            return {
                ...state,
                ...action.payload,
            };

        case POST_EDIT_FILE_CHANGE:
            return {
                ...state,
                postEdit: {
                    ...state.postEdit,
                    imageUrl: action.payload.url,
                    pictureFile: action.payload.file,
                },
            };

        case POST_EDIT_FIELD_CHANGE:
            return {
                ...state,
                postEdit: {
                    ...state.postEdit,
                    [action.payload.name]: action.payload.value,
                },
            };

        case POST_EDIT_IS_PUBLIC_CHANGE:
            return {
                ...state,
                postEdit: {
                    ...state.postEdit,
                    isPublic: action.payload.value,
                },
            };

        case POST_EDIT_SAVE_SUCCESS:
            return state;

        case POST_EDIT_SAVE_FAIL:
            return state;

        case POST_EDIT_START_ADD_PRODUCT:
            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    postPartId: action.payload.partId,
                },
            };

        case POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE:
            const {fieldName} = action.payload;

            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    [fieldName]: action.payload.value,
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
                },
            };

        case POST_EDIT_PRODUCT_BRAND_CHANGE:
            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    brandId: action.payload.id,
                },
            };

        case POST_EDIT_PRODUCT_PRODUCT_CHANGE:
            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    productId: action.payload.id,
                },
            };

        case POST_EDIT_PRODUCT_COLOR_CHANGE:
            return {
                ...state,
                editPostPartProduct: {
                    ...state.editPostPartProduct,
                    productColorId: action.payload.colorId,
                },
            };

        case POST_EDIT_PRODUCT_CANCEL:
            return {
                ...state,
                editPostPartProduct: emptyEditPostPartProduct,
            };
        
        case POST_EDIT_PRODUCT_SAVE_SUCCESS:
            return {
                ...state,
                editPostPartProduct: emptyEditPostPartProduct,
            };

        case POST_EDIT_PART_NEW:
            return {
                ...state,
                editPostPart: {
                    id: 0,
                    title: '',
                    position: {
                        x: 50,
                        y: 50,
                    },
                    color: '000000',
                    productIds: [],
                },
            };

        case POST_EDIT_PART_EDIT:
            return {
                ...state,
                editPostPart: action.payload,
            };

        case POST_EDIT_PART_CHANGE_FIELD:
            return {
                ...state,
                editPostPart: {
                    ...state.editPostPart,
                    [action.payload.name]: action.payload.value,
                },
            };

        case POST_EDIT_PART_CHANGE_POSITION:
            return {
                ...state,
                editPostPart: {
                    ...state.editPostPart,
                    position: action.payload.position,
                },
            };

        case POST_EDIT_PART_SAVE_SUCCESS:
            let newPostPartIds = [];
            if (state.postPartIds.indexOf(action.payload.data.id) !== -1) {
                // exists
                newPostPartIds = state.postPartIds;
            } else {
                // new
                newPostPartIds = [...state.postPartIds, action.payload.data.id];
            }

            return {
                ...state,
                editPostPart: null,
                postPartIds: newPostPartIds,
            };

        case POST_EDIT_PART_SAVE_FAIL:
            return state;

        case POST_EDIT_PART_CANCEL:
            return {
                ...state,
                editPostPart: null,
            };

        case POST_EDIT_PART_REMOVE:
            return state;

        case POST_EDIT_PART_REMOVE_SUCCESS:
            return {
                ...state,
                postPartIds: state.postPartIds.filter(id => id !== action.payload.postPartId),
            };

        case POST_EDIT_PART_REMOVE_FAIL:
            return state;
    }

    return state;
}
