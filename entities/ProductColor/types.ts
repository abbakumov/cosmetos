import {PRODUCT_COLORS_DATA_FETCHED} from './actions';

export type ProductColorId = number;

export interface ProductColor {
    id: ProductColorId;
    title: string;
    picUrl: string;
}

export interface ProductColorMap {
    [id: number]: ProductColor;
}

// ACTIONS ->
export interface ProductColorsDataFetchedAction {
    type: typeof PRODUCT_COLORS_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: ProductColor;
        }
    }
};
// <- ACTIONS

export type ProductColorActionType =
    | ProductColorsDataFetchedAction;

export interface ProductColorState {
    items: {
        [id: number]: ProductColor;
    }
};
