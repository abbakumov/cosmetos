import {
    Brand,
    BrandsDataFetchedAction,
} from './types';

export const BRANDS_DATA_FETCHED = 'BRANDS_DATA_FETCHED';

export interface UnProductMap {
    [id: number]: Brand;
}

export const brandsDataFetchedAction = (data: UnProductMap): BrandsDataFetchedAction => ({
    type: BRANDS_DATA_FETCHED,
    payload: {data},
});

