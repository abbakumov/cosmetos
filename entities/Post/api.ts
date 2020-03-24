import fetch from 'isomorphic-fetch';
import fetchData from '../../src/helpers/fetchData';
import {getOrigin} from '../../configs/location';

import {ICosPageContext} from '../../types/context';

import {PostBase, PostId} from './types';
import {PostExtra} from '../PostExtra/types';
import {BlogMap, BlogLogin} from '../Blog/types';
import {BlogProduct} from '../BlogProduct/types';
import {PostPart} from '../PostPart/types';
import {PostPartProductMap} from '../PostPartProduct/types';
import {ProductColorMap} from '../ProductColor/types';
import {ProductBaseMap} from '../ProductBase/types';
import {PostEdit} from '../PostEdit/types';
import {UnProductMap} from '../UnProduct/types';

export interface GetPostByIdResponse {
    blog: {
        data: BlogMap
        currentLogin: BlogLogin
    }
    postBase: PostBase
    postExtra: PostExtra
    postPart: {
        [id: number]: PostPart
    },
    postPartProduct: PostPartProductMap
    productColor: ProductColorMap
    productBase: ProductBaseMap
    unProduct: UnProductMap
    blogProduct: {
        [id: number]: BlogProduct
    }
}
export function getPostById(id: PostId, context?: ICosPageContext): Promise<GetPostByIdResponse> {
    return fetchData<GetPostByIdResponse>(
        `${getOrigin()}/api/post/${id}`,
        {},
        context
    );
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

export interface PublishPostResponse {
    status: 'success' | 'fail';
}
export function publishPost(id: PostId): Promise<PublishPostResponse> {
    return fetchData(
        `${getOrigin()}/api/post/${id}/publish`,
        {
            method: 'POST',
        }
    );
}
