import fetch from 'isomorphic-fetch';
import fetchData from '../../src/helpers/fetchData';
import {getOrigin} from '../../configs/location';

import {ICosPageContext} from '../../types/context';

import {PostBase, PostId, PostMap} from './types';
import {PostExtra} from '../PostExtra/types';
import {BlogMap, BlogLogin, BlogsData} from '../Blog/types';
import {BlogProductMap} from '../BlogProduct/types';
import {PostPartMap} from '../PostPart/types';
import {PostPartProductMap} from '../PostPartProduct/types';
import {ProductColorMap} from '../ProductColor/types';
import {ProductBaseMap} from '../ProductBase/types';
import {PostEdit} from '../PostEdit/types';
import {UnProductMap} from '../UnProduct/types';
import {BrandMap} from '../Brand/types';

export interface GetPostByIdResponse {
    blog: {
        data: BlogMap
        currentLogin: BlogLogin
    }
    postBase: PostBase
    postExtra: PostExtra
    postPart: PostPartMap
    postPartProduct: PostPartProductMap
    productColor: ProductColorMap
    productBase: ProductBaseMap
    unProduct: UnProductMap
    blogProduct: BlogProductMap
    brand: BrandMap
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

export interface GetMainPostsResponse {
    postIds: PostId[]
    blog: BlogsData
    post: PostMap
    isMoreAvailable: boolean
}
export const getMainPosts = (offset?: number): Promise<GetMainPostsResponse> =>
    fetchData(`${getOrigin()}/api/main/posts?offset=${offset ? offset : 0}`);
