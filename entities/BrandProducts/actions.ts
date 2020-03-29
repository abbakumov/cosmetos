import {productsBaseDataFetchedAction} from '../ProductBase/actions';
import {BrandId} from '../Brand/types';

import {
    BrandProducts,
    BrandProductsDataFetchedAction,
} from './types';
import {getBrandProducts} from './api';

export const BRAND_PRODUCTS_DATA_FETCHED = 'BRAND_PRODUCTS_DATA_FETCHED';

export const brandProductsFetch = (id: BrandId) => (dispatch) =>
    getBrandProducts(id)
        .then(data => {
            dispatch(productsBaseDataFetchedAction(data.productBase));
            dispatch(brandProductsDataFetchedAction(data.brandProducts));
        });

export const brandProductsDataFetchedAction = (data: BrandProducts): BrandProductsDataFetchedAction => ({
    type: BRAND_PRODUCTS_DATA_FETCHED,
    payload: {data},
});
