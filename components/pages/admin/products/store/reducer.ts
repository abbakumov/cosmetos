import {
    PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS,
    PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE,
    PAGE_ADMIN_PRODUCTS_ROWS_CHANGE,
    PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE,
    PAGE_ADMIN_PRODUCTS_NEXT_PAGE,
} from './actions';

import {
    PageAdminProductsState,
    PageAdminProductsAction
} from './types';

const initialState = {
    ids: [],
    total: 0,
    pageRows: 25,
    offset: 0,
    filterTitle: '',
};

export function pageAdminProductsReducer(state: PageAdminProductsState = initialState, action: PageAdminProductsAction) {
    switch (action.type) {
        case PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                ids: action.payload.ids,
                total: action.payload.total,
            };

        case PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE:
            return {
                ...state,
                filterTitle: action.payload.value,
            };

        case PAGE_ADMIN_PRODUCTS_ROWS_CHANGE:
            return {
                ...state,
                pageRows: action.payload.value,
            };

        case PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE:
            const newOffset = state.offset - state.pageRows;
            return {
                ...state,
                offset: newOffset > 0 ? newOffset : 0,
            };

        case PAGE_ADMIN_PRODUCTS_NEXT_PAGE:
            const _newOffset = state.offset + state.pageRows;
            return {
                ...state,
                offset: _newOffset >= state.total ? state.offset : _newOffset,
            };
    }

    return state;
}
