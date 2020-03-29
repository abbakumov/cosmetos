import {getOrigin} from '../../configs/location';
import fetchData from '../../src/helpers/fetchData';

import {ProductBaseMap} from '../ProductBase/types';
import {BrandProducts} from './types';
import {BrandId} from '../Brand/types';

export interface GetBrandProductsResponse {
    brandProducts: BrandProducts
    productBase: ProductBaseMap
}

export const getBrandProducts = (id: BrandId): Promise<GetBrandProductsResponse> =>
    fetchData<GetBrandProductsResponse>(`${getOrigin()}/api/brand/${id}/products`);
