import {PRODUCTS_BASE_DATA_FETCHED} from './actions';

export type ProductId = number;

export interface ProductBase {
    id: ProductId;
    brand: string;
    title: string;
    smallPicUrl: string;
}

// ACTIONS ->
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
    | ProductsBaseDataFetchedAction;

export interface ProductBaseState {
    items: {
        [id: number]: ProductBase;
    }
};
