import fetch from 'isomorphic-fetch';

import {getOrigin} from '../../configs/location';
import {BrandId, BrandMap} from './types';

export interface GetAdminBrandsResponse {
    brand: BrandMap;
    ids: BrandId[];
}

export function getAdminBrands(): Promise<GetAdminBrandsResponse> {
    return fetch(`${getOrigin()}/api/admin/brands`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetAdminBrandsResponse>
        });
}
