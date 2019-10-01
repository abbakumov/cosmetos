import fetch from 'isomorphic-fetch';

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

export function getAdminUnProducts(): Promise<GetAdminUnProductsResponse> {
    return fetch('http://localhost:3000/api/admin/un-products')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetAdminUnProductsResponse>
        });
}
