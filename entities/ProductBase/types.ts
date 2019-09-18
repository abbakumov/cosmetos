import {
    PRODUCT_BASE_DATA_FETCHED,
    PRODUCTS_BASE_DATA_FETCHED,
} from './actions';

export type ProductId = number;

export interface ProductBase {
    id: ProductId;
    brand: string;
    title: string;
    smallPicUrl: string;
}

// ACTIONS ->
export interface ProductBaseDataFetchedAction {
    type: typeof PRODUCT_BASE_DATA_FETCHED;
    payload: {
        data: ProductBase;
    }
};

export interface ProductsBaseDataFetchedAction {
    type: typeof PRODUCTS_BASE_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: ProductBase;
        }
    }
};
// <- ACTIONS

export type ProductBaseActionType =
    | ProductBaseDataFetchedAction
    | ProductsBaseDataFetchedAction;

export interface ProductBaseState {
    items: {
        [id: number]: ProductBase;
    }
};
