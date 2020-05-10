import _ from 'lodash';

import fetchData from '../../src/helpers/fetchData';

import {getOrigin} from '../../configs/location';
import {ICosPageContext} from '../../types/context';

import {BrandMap} from '../Brand/types';
import {ProductBaseMap, ProductId} from '../ProductBase/types';
import {ProductColorId} from '../ProductColor/types';
import {PostPartProductId} from '../PostPartProduct/types';

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
    postPartProductId: PostPartProductId
}
export const deleteUnProduct = (id: UnProductId): Promise<DeleteUnProductResponse> =>
    fetchData<DeleteUnProductResponse>(
        `${getOrigin()}/api/un-product/${id}`,
        {method: 'DELETE'}
    );


export interface ReplaceUnProductOptions {
    id: UnProductId
    productId: ProductId
    productColorId: ProductColorId
}
export interface ReplaceUnProductResponse {
    status: 'success' | 'fail'
}
export const replaceUnProduct = (options: ReplaceUnProductOptions): Promise<ReplaceUnProductResponse> =>
    fetchData<DeleteUnProductResponse>(
        `${getOrigin()}/api/admin/un-product/${options.id}/replace`,
        {
            method: 'POST',
            body: JSON.stringify(_.pick(options, ['productId', 'productColorId'])),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
    );
