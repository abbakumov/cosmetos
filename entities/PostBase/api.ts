import fetch from 'isomorphic-fetch';

import {PostBase, PostId} from './types';
import {PostExtra} from '../PostExtra/types';
import {Blog} from '../Blog/types';
import {BlogProduct} from '../BlogProduct/types';
import {PostPart} from '../PostPart/types';
import {ProductBase} from '../ProductBase/types';

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
    return fetch(`http://localhost:3000/api/post/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetPostByIdResponse>
        });
}
