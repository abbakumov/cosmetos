import {ProductColorMap, ProductColorsDataFetchedAction} from './types';

export const PRODUCT_COLORS_DATA_FETCHED = 'PRODUCT_COLORS_DATA_FETCHED';

export const productColorsDataFetchedAction = (data: ProductColorMap): ProductColorsDataFetchedAction => ({
    type: PRODUCT_COLORS_DATA_FETCHED,
    payload: {data},
});
