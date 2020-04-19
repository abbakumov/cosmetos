import fetchData from '../../src/helpers/fetchData';
import {getOrigin} from '../../configs/location';
import {ICosPageContext} from '../../types/context';

import {BlogExtra} from '../BlogExtra/types';
import {PostBase} from '../Post/types';

import {BlogMap, BlogLogin} from './types';

interface GetBlogByNameResponse {
    blog: {
        data: BlogMap
        currentLogin: BlogLogin
    }
    blogExtra: BlogExtra
    postsBase: {
        [id: number]: PostBase
    }
}

export function getBlogByName(name: string, offset: number = 0, context?: ICosPageContext): Promise<GetBlogByNameResponse> {
    return fetchData<GetBlogByNameResponse>(
        `${getOrigin()}/api/blog/${name}?offset=${offset}`,
        {},
        context
    );
}

export interface PostBlogData {
    name?: string,
    instagramLogin?: string
    bio?: string
    imageFile?: File
}
export interface PostBlogResponse {
    status: 'success' | 'fail'
}
export const postBlog = (data: PostBlogData): Promise<PostBlogResponse> => {
    const body = new FormData();
    if (data.name) {
        body.append('name', data.name);
    }
    if (data.instagramLogin) {
        body.append('instagramLogin', data.instagramLogin);
    }
    if (data.bio) {
        body.append('bio', data.bio);
    }
    if (data.imageFile) {
        body.append('imageFile', data.imageFile);
    }
    return fetchData(
        `${getOrigin()}/api/blog`,
        {
            body,
            method: 'POST',
        }
    );
};
