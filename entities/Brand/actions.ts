import {
    Brand,
    BrandsDataFetchedAction,
    BrandMap,
} from './types';

export const BRANDS_DATA_FETCHED = 'BRANDS_DATA_FETCHED';

export const brandsDataFetchedAction = (data: BrandMap): BrandsDataFetchedAction => ({
    type: BRANDS_DATA_FETCHED,
    payload: {data},
});
