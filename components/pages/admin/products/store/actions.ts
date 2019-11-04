import {ProductId} from '../../../../../entities/ProductBase/types';

import {
    PageAdminProductsFetchSuccessAction
} from './types';

export const PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS = 'PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS';
export const PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE = 'PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE';
export const PAGE_ADMIN_PRODUCTS_ROWS_CHANGE = 'PAGE_ADMIN_PRODUCTS_ROWS_CHANGE';
export const PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE = 'PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE';
export const PAGE_ADMIN_PRODUCTS_NEXT_PAGE = 'PAGE_ADMIN_PRODUCTS_NEXT_PAGE';

export const pageAdminProductsFetchSuccessAction = (total: number, ids: ProductId[]): PageAdminProductsFetchSuccessAction => ({
    type: PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS,
    payload: {total, ids},
});

export const pageAdminProductsFilterTitleChangeAction = (value: string) => (dispatch, getState) => {
    dispatch({
        type: PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE,
        payload: {value},
    });
};

export const pageAdminProductsRowsChangeAction = (value: number) => (dispatch, getState) => {
    dispatch({
        type: PAGE_ADMIN_PRODUCTS_ROWS_CHANGE,
        payload: {value},
    });
};

export const pageAdminProductsPreviousPageAction = () => (dispatch, getState) => {
    dispatch({type: PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE});
};

export const pageAdminProductsNextPageAction = () => (dispatch, getState) => {
    dispatch({type: PAGE_ADMIN_PRODUCTS_NEXT_PAGE});
};

