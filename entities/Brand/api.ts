import {getOrigin} from '../../configs/location';
import {ICosPageContext} from '../../types/context';
import fetchData from '../../src/helpers/fetchData';

import {BrandId, BrandMap, Brand} from './types';

export interface GetAdminBrandsResponse {
    brand: BrandMap;
    ids: BrandId[];
}
export const getAdminBrands = (params: Object, context: ICosPageContext): Promise<GetAdminBrandsResponse> =>
    fetchData<GetAdminBrandsResponse>(
        `${getOrigin()}/api/admin/brands`,
        {},
        context
    );


interface SaveBrandResponse {
    status: 'success' | 'fail';
    brandId: BrandId;
}
export const saveBrand = (brand: Brand): Promise<SaveBrandResponse> =>
    fetchData<SaveBrandResponse>(
        `${getOrigin()}/api/admin/brands`,
        {
            method: 'POST',
            body: JSON.stringify(brand),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
    );
