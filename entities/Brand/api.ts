import fetch from 'isomorphic-fetch';

import {getOrigin} from '../../configs/location';
import {BrandId, BrandMap, Brand} from './types';

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

interface SaveBrandResponse {
    status: 'success' | 'fail';
    brandId: BrandId;
}
export const saveBrand = (brand: Brand): Promise<SaveBrandResponse> =>
    fetch(
        `${getOrigin()}/api/admin/brands`,
        {
            method: 'POST',
            body: JSON.stringify(brand),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
    ).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json() as Promise<SaveBrandResponse>
    });
