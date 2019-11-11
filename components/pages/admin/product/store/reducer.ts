import {
    PAGE_ADMIN_PRODUCT_DATA_FETCHED,
    PAGE_ADMIN_PRODUCT_BRANDS_FETCHED,
    PAGE_ADMIN_PRODUCT_CHANGE_BRAND_ID,
    PAGE_ADMIN_PRODUCT_CHANGE_FIELD,
    PAGE_ADMIN_PRODUCT_CHANGE_PICTURE,
    PAGE_ADMIN_PRODUCT_COLOR_ADD,
    PAGE_ADMIN_PRODUCT_COLOR_CHANGE_FIELD,
    PAGE_ADMIN_PRODUCT_COLOR_CHANGE_PICTURE,
    PAGE_ADMIN_PRODUCT_COLOR_SAVE_SUCCESS,
    PAGE_ADMIN_PRODUCT_COLOR_SAVE_FAIL,
    PAGE_ADMIN_PRODUCT_COLOR_CANCEL,
    PAGE_ADMIN_PRODUCT_COLOR_DELETE_SUCCESS,
    PAGE_ADMIN_PRODUCT_COLOR_DELETE_FAIL,
    PAGE_ADMIN_PRODUCT_SAVE_SUCCESS,
    PAGE_ADMIN_PRODUCT_SAVE_FAIL,
} from './actions';

import {
    PageAdminProductState,
    PageAdminProductAction,
} from './types';

const emptyProductEdit = {
    id: 0,
    brandId: 0,
    kind: '',
    title: '',
    description: '',
    pictureFile: null,
    pictureUrl: '',
    colorIds: [],
};

const emptyProductColorEdit = {
    title: '',
    colorHex: '',
    pictureFile: null,
    pictureUrl: '',
};

const initialState = {
    brandIds: [],
    productEdit: emptyProductEdit,
    productColorEdit: null,
};

export function pageAdminProductReducer(state: PageAdminProductState = initialState, action: PageAdminProductAction) {
    switch (action.type) {
        case PAGE_ADMIN_PRODUCT_DATA_FETCHED:
            return {
                ...state,
                brandIds: action.payload.brandIds,
                productEdit: action.payload.product,
            };

        case PAGE_ADMIN_PRODUCT_BRANDS_FETCHED:
            return {
                ...state,
                brandIds: action.payload.brandIds,
            };

        case PAGE_ADMIN_PRODUCT_CHANGE_BRAND_ID:
            return {
                ...state,
                productEdit: {
                    ...state.productEdit,
                    brandId: action.payload.id,
                },
            };

        case PAGE_ADMIN_PRODUCT_CHANGE_FIELD:
            return {
                ...state,
                productEdit: {
                    ...state.productEdit,
                    [action.payload.name]: action.payload.value,
                },
            };

        case PAGE_ADMIN_PRODUCT_CHANGE_PICTURE:
            return {
                ...state,
                productEdit: {
                    ...state.productEdit,
                    pictureFile: action.payload.file,
                    pictureUrl: action.payload.url,
                },
            };

        case PAGE_ADMIN_PRODUCT_COLOR_ADD:
            return {
                ...state,
                productColorEdit: emptyProductColorEdit,
            };

        case PAGE_ADMIN_PRODUCT_COLOR_CHANGE_FIELD:
            return {
                ...state,
                productColorEdit: {
                    ...state.productColorEdit,
                    [action.payload.name]: action.payload.value,
                },
            };

        case PAGE_ADMIN_PRODUCT_COLOR_CHANGE_PICTURE:
            return {
                ...state,
                productColorEdit: {
                    ...state.productColorEdit,
                    pictureFile: action.payload.file,
                    pictureUrl: action.payload.url,
                },
            };

        case PAGE_ADMIN_PRODUCT_COLOR_SAVE_SUCCESS:
            return {
                ...state,
                productEdit: {
                    ...state.productEdit,
                    colorIds: [...state.productEdit.colorIds, action.payload.id],
                },
                productColorEdit: null,
            };

        case PAGE_ADMIN_PRODUCT_COLOR_SAVE_FAIL:
            return {
                ...state,
            };

        case PAGE_ADMIN_PRODUCT_COLOR_CANCEL:
            return {
                ...state,
                productColorEdit: null,
            };

        case PAGE_ADMIN_PRODUCT_COLOR_DELETE_SUCCESS:
            return {
                ...state,
                productEdit: {
                    ...state.productEdit,
                    colorIds: state.productEdit.colorIds.filter(id => id !== action.payload.id),
                },
            };

        case PAGE_ADMIN_PRODUCT_COLOR_DELETE_FAIL:
            return {
                ...state,
            };

        case PAGE_ADMIN_PRODUCT_SAVE_SUCCESS:
            return {
                ...state,
                productEdit: {
                    ...state.productEdit,
                    id: action.payload.id,
                },
            };

        case PAGE_ADMIN_PRODUCT_SAVE_FAIL:
            return {
                ...state,
            };
    }

    return state;
}
