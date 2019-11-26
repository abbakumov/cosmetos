import fetchData from '../../src/helpers/fetchData';
import {getOrigin} from '../../configs/location';
import {ProductColorEdit} from '../../components/pages/admin/product/store/types';

import {ProductId} from '../ProductBase/types';

import {ProductColorId} from './types';

export interface PostProductColorResponse {
    productColorId: ProductColorId;
}
export function postProductColor(data: ProductColorEdit, productId: ProductId): Promise<PostProductColorResponse> {
    const formData = new FormData();

    formData.append('productId', String(productId));
    formData.append('title', data.title);
    formData.append('pictureFile', data.pictureFile);

    return fetchData<PostProductColorResponse>(
        `${getOrigin()}/api/admin/product-color`,
        {
            method: 'POST',
            body: formData
        }
    );
}

export interface DeleteProductColorResponse {
    status: 'success' | 'fail';
}
export const deleteProductColor = (id: ProductColorId): Promise<DeleteProductColorResponse> =>
    fetchData<DeleteProductColorResponse>(
        `${getOrigin()}/api/admin/product-color/${id}`,
        {method: 'DELETE'}
    );
