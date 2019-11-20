import fetch from 'isomorphic-fetch';

import {getOrigin} from '../../configs/location';

import {PostBase, PostId} from './types';
import {PostExtra} from '../PostExtra/types';
import {Blog} from '../Blog/types';
import {BlogProduct} from '../BlogProduct/types';
import {PostPart} from '../PostPart/types';
import {ProductBase} from '../ProductBase/types';
import {PostEdit} from '../PostEdit/types';

export interface GetPostByIdResponse {
    blog: Blog;
    postBase: PostBase,
    postExtra: PostExtra,
    postPart: {
        [id: number]: PostPart,
    },
    productBase: {
        [id: number]: ProductBase,
    },
    blogProduct: {
        [id: number]: BlogProduct,
    }
}
export function getPostById(id: PostId): Promise<GetPostByIdResponse> {
    return fetch(`${getOrigin()}/api/post/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetPostByIdResponse>
        });
}

export interface SavePostResponse {
    status: 'success' | 'fail';
    postId: PostId;
}
export function savePost(data: PostEdit): Promise<SavePostResponse> {
    const formData = new FormData();
    if (data.id) {
        formData.append('id', String(data.id));
    }
    formData.append('title', data.title);
    formData.append('instaPostId', data.instaPostId);
    formData.append('description', data.description);
    formData.append('isPublic', data.isPublic ? 'true' : 'false');
    if (data.pictureFile) {
        formData.append('pictureFile', data.pictureFile);
    }

    return fetch(
        `${getOrigin()}/api/post`,
        {
            method: 'POST',
            body: formData,
        }
    )
        .then(response => response.json());
}
