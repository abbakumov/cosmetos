import {getOrigin} from '../../configs/location';

import {PostId} from '../Post/types';

import {PostPartId, PostPart} from './types';
import {EditPostPartProduct} from '../../components/pages/post-edit/store/types';
import {PostProductId} from '../PostProduct/types';

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


interface SavePostPartProductResponse {
    status: 'success' | 'fail';
    postPartProductId: PostProductId;
}
export const savePostPartProduct = (editPostPartProduct: EditPostPartProduct): Promise<SavePostPartProductResponse> =>
    fetch('/api/post-product', {
        method: 'POST',
        body: JSON.stringify(editPostPartProduct),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json());


interface DeletePostPartProduct {
    status: 'success' | 'fail';
}
export const deletePostPartProduct = (id: PostProductId): Promise<DeletePostPartProduct> =>
    fetch(`/api/post-product/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json());
