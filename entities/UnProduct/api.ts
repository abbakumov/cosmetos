import fetchData from '../../src/helpers/fetchData';

import {getOrigin} from '../../configs/location';
import {ICosPageContext} from '../../types/context';

import {BrandMap} from '../Brand/types';
import {ProductBaseMap} from '../ProductBase/types';

import {UnProductExtraMap} from '../UnProductExtra/types';
import {UnProductMap, UnProductId} from './types';

export interface GetAdminUnProductsResponse {
    unProduct: UnProductMap
    unProductExtra: UnProductExtraMap
    brand: BrandMap
    productBase: ProductBaseMap
}
export const getAdminUnProducts = (context: ICosPageContext): Promise<GetAdminUnProductsResponse> =>
    fetchData<GetAdminUnProductsResponse>(
        `${getOrigin()}/api/admin/un-product`,
        {},
        context
    );


export interface DeleteUnProductResponse {
    status: 'success' | 'fail'
}
export const deleteUnProduct = (id: UnProductId): Promise<DeleteUnProductResponse> =>
    fetchData<DeleteUnProductResponse>(
        `${getOrigin()}/api/un-product/${id}`,
        {method: 'DELETE'}
    );
