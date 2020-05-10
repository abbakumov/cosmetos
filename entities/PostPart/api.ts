import {getOrigin} from '../../configs/location';

import {PostId} from '../Post/types';

import {PostPartId, PostPart} from './types';
import {EditPostPartProduct} from '../../components/pages/post-edit/store/types';
import {UnProductId} from '../UnProduct/types';
import {PostPartProductId} from '../PostPartProduct/types';

export interface SavePostPartResponse {
    status: string;
    partId: PostPartId;
}
export function savePostPart(postId: PostId, partData: PostPart): Promise<SavePostPartResponse> {
    return fetch(
        `${getOrigin()}/api/post/${postId}/part`,
        {
            method: 'POST',
            body: JSON.stringify(partData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<SavePostPartResponse>
            });
}

export interface DeletePostPartResponse {
    status: 'success' | 'fail';
}
export function deletePostPart(id: PostPartId): Promise<DeletePostPartResponse> {
    return fetch(
        `${getOrigin()}/api/post-part/${id}`,
        {method: 'DELETE'}
    ).then(response => response.json());
}


type SavePostPartProductOptions = Pick<EditPostPartProduct,
    | 'postPartId'
    | 'brandText'
    | 'brandId'
    | 'productText'
    | 'productId'
    | 'productColorText'
>;
interface SavePostPartProductResponse {
    status: 'success' | 'fail'
    postPartProductId: PostPartProductId
    unassignedProductId?: UnProductId
}
export const savePostPartProduct = (options: SavePostPartProductOptions): Promise<SavePostPartProductResponse> =>
    fetch('/api/post-product', {
        method: 'POST',
        body: JSON.stringify(options),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(response => response.json());


interface DeletePostPartProduct {
    status: 'success' | 'fail';
}
export const deletePostPartProduct = (id: PostPartProductId): Promise<DeletePostPartProduct> =>
    fetch(`/api/post-product/${id}`, {
        method: 'DELETE',
    }).then(response => response.json());
