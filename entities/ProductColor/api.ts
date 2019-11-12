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

    return fetch(
            `${getOrigin()}/api/admin/product-color`,
            {
                method: 'POST',
                body: formData
            }
        )
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<PostProductColorResponse>
        });
}

export interface DeleteProductColorResponse {
    status: 'success' | 'fail';
}
export function deleteProductColor(id: ProductColorId): Promise<DeleteProductColorResponse> {
    return fetch(
            `${getOrigin()}/api/admin/product-color/${id}`,
            {method: 'DELETE'}
        )
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<DeleteProductColorResponse>
        });
}