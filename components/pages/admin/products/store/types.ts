import {ProductId} from '../../../../../entities/ProductBase/types';

import {
    PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS,
    PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE,
    PAGE_ADMIN_PRODUCTS_ROWS_CHANGE,
    PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE,
    PAGE_ADMIN_PRODUCTS_NEXT_PAGE,
} from './actions';

export interface PageAdminProductsState {
    ids: ProductId[];
    total: number;
    pageRows: number;
    offset: number;
    filterTitle: string;
}

export interface PageAdminProductsFetchSuccessAction {
    type: typeof PAGE_ADMIN_PRODUCTS_FETCH_SUCCESS;
    payload: {
        total: number;
        ids: ProductId[],
    };
}

export interface PageAdminProductsFilterTitleChangeAction {
    type: typeof PAGE_ADMIN_PRODUCTS_FILTER_TITLE_CHANGE;
    payload: {
        value: string;
    };
}

export interface PageAdminProductsRowsChangeAction {
    type: typeof PAGE_ADMIN_PRODUCTS_ROWS_CHANGE;
    payload: {
        value: number;
    };
}

export interface PageAdminProductsPreviousPageAction {
    type: typeof PAGE_ADMIN_PRODUCTS_PREVIOUS_PAGE;
}

export interface PageAdminProductsNextPageAction {
    type: typeof PAGE_ADMIN_PRODUCTS_NEXT_PAGE;
}

export type PageAdminProductsAction =
    | PageAdminProductsFetchSuccessAction
    | PageAdminProductsFilterTitleChangeAction
    | PageAdminProductsRowsChangeAction
    | PageAdminProductsPreviousPageAction
    | PageAdminProductsNextPageAction
    ;
