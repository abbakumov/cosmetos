import {
    PageAdminBrandsState,
    PageAdminBrandsAction,
} from './types';

import {
    PAGE_ADMIN_BRANDS_FETCH_SUCCESS,
    PAGE_ADMIN_BRANDS_NEW,
    PAGE_ADMIN_BRANDS_SAVE,
    PAGE_ADMIN_BRANDS_SAVE_SUCCESS,
    PAGE_ADMIN_BRANDS_SAVE_FAIL,
    PAGE_ADMIN_BRANDS_CANCEL,
    PAGE_ADMIN_BRANDS_CHANGE_FIELD,
    PAGE_ADMIN_BRANDS_EDIT,
} from './actions';

const emptyBrand = {
    id: 0,
    titleShort: '',
    titleFull: '',
};

const initialState ={
    ids: [],
    editBrand: null,
};

export function pageAdminBrandsReducer(state: PageAdminBrandsState = initialState, action: PageAdminBrandsAction) {
    switch (action.type) {
        case PAGE_ADMIN_BRANDS_FETCH_SUCCESS:
            return {
                ...state,
                ids: action.payload.ids,
            };

        case PAGE_ADMIN_BRANDS_NEW:
            return {
                ...state,
            };

        case PAGE_ADMIN_BRANDS_SAVE:
            return {
                ...state,
            };

        case PAGE_ADMIN_BRANDS_SAVE_SUCCESS:
            return {
                ...state,
            };

        case PAGE_ADMIN_BRANDS_SAVE_FAIL:
            return {
                ...state,
            };

        case PAGE_ADMIN_BRANDS_CANCEL:
            return {
                ...state,
            };

        case PAGE_ADMIN_BRANDS_CHANGE_FIELD:
            return {
                ...state,
            };

        case PAGE_ADMIN_BRANDS_EDIT:
            return {
                ...state,
            };
    }

    return state;
}
