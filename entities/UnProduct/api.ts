import fetchData from '../../src/helpers/fetchData';

import {getOrigin} from '../../configs/location';

import {Brand} from '../Brand/types';
import {ProductBase} from '../ProductBase/types';

import {UnProduct} from './types';

export interface GetAdminUnProductsResponse {
    unProduct: {
        [id: number]: UnProduct;
    };
    brand: {
        [id: number]: Brand;
    };
    productBase: {
        [id: number]: ProductBase;
    };
}
export const getAdminUnProducts = (): Promise<GetAdminUnProductsResponse> =>
    fetchData<GetAdminUnProductsResponse>(`${getOrigin}/api/admin/un-products`);
