import fetch from 'isomorphic-fetch';

import {Blog} from './types';
import {BlogExtra} from '../BlogExtra/types';
import {PostBase} from '../Post/types';
import {getOrigin} from '../../configs/location';

interface GetBlogByNameResponse {
    blog: Blog;
    blogExtra: BlogExtra;
    postsBase: {
        [id: number]: PostBase;
    }
}

export function getBlogByName(name: string[]): Promise<GetBlogByNameResponse> {
    return fetch(`${getOrigin()}/api/blog/${name[0]}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetBlogByNameResponse>
        });
}
