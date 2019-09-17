import {ProductColor, ProductColorsDataFetchedAction} from './types';

export const PRODUCT_COLORS_DATA_FETCHED = 'PRODUCT_COLORS_DATA_FETCHED';

export interface ProductColorsMap {
    [id: number]: ProductColor;
}

export const productColorsDataFetchedAction = (data: ProductColorsMap): ProductColorsDataFetchedAction => ({
    type: PRODUCT_COLORS_DATA_FETCHED,
    payload: {data},
});
