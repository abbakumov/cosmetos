import fetch from 'isomorphic-fetch';

import {getOrigin} from '../../configs/location';

import {ProductBaseMap} from '../ProductBase/types';
import {BrandProducts} from './types';
import {BrandId} from '../Brand/types';

export interface GetBrandProductsResponse {
    brandProducts: BrandProducts;
    productBase: ProductBaseMap;
}

export function getBrandProducts(id: BrandId): Promise<GetBrandProductsResponse> {
    return fetch(`${getOrigin()}/api/brand/${id}/products`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetBrandProductsResponse>
        });
}
