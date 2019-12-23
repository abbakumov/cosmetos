const _ = require('lodash');

import {ProductId} from '../../../../../entities/ProductBase/types';
import {getAdminProducts} from '../../../../../entities/ProductBase/api';

import {
    PageAdminProductsFetchSuccessAction
} from './types';
import {AppState} from '../../../../../store';
import {productsBaseDataFetchedAction} from '../../../../../entities/ProductBase/actions';

export const PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS = 'PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS';
export const PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE = 'PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE';
export const PAGE_ADMIN_PRODUCTS_ROWS_CHANGE = 'PAGE_ADMIN_PRODUCTS_ROWS_CHANGE';
export const PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE = 'PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE';
export const PAGE_ADMIN_PRODUCTS_NEXT_PAGE = 'PAGE_ADMIN_PRODUCTS_NEXT_PAGE';

export const pageAdminProductsFetchSuccessAction = (total: number, ids: ProductId[]): PageAdminProductsFetchSuccessAction => ({
    type: PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS,
    payload: {total, ids},
});

async function updateProducts(dispatch, getState) {
    const state: AppState = getState();

    const params = {
        ..._.pick(state.pageAdminProducts, ['offset', 'filterTitle']),
        limit: state.pageAdminProducts.pageRows,
    };

    const data = await getAdminProducts(params);
    // TODO: check if params not changed, or replace to RxJS
    dispatch(productsBaseDataFetchedAction(data.product));
    dispatch(pageAdminProductsFetchSuccessAction(data.total, data.ids));
}

export const pageAdminProductsFilterTitleChangeAction = (value: string) => (dispatch, getState) => {
    dispatch({
        type: PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE,
        payload: {value},
    });

    updateProducts(dispatch, getState);
};

export const pageAdminProductsRowsChangeAction = (value: number) => (dispatch, getState) => {
    dispatch({
        type: PAGE_ADMIN_PRODUCTS_ROWS_CHANGE,
        payload: {value},
    });

    updateProducts(dispatch, getState);
};

export const pageAdminProductsPreviousPageAction = () => (dispatch, getState) => {
    dispatch({type: PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE});
    updateProducts(dispatch, getState);
};

export const pageAdminProductsNextPageAction = () => (dispatch, getState) => {
    dispatch({type: PAGE_ADMIN_PRODUCTS_NEXT_PAGE});
    updateProducts(dispatch, getState);
};

