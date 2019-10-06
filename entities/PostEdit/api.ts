import fetch from 'isomorphic-fetch';

import {PostId} from '../PostBase/types';
import {PostPart, PostPartId} from '../PostPart/types';
import {ProductBase} from '../ProductBase/types';
import {PostProduct} from '../PostProduct/types';
import {ProductExtra} from '../ProductExtra/types';
import {ProductColor} from '../ProductColor/types';

import {PostEdit} from './types';

export interface GetPostEditByIdResponse {
    postEdit: PostEdit;
    postPartIds: PostPartId[];
    postProduct: {
        [id: number]: PostProduct;
    };
    postPart: {
        [id: number]: PostPart;
    };
    productBase: ProductBase;
    productExtra: ProductExtra;
    productColor: {
        [id: number]: ProductColor;
    };
}

export function getPostEditById(id: PostId): Promise<GetPostEditByIdResponse> {
    return fetch(`http://localhost:3000/api/post/${id}/edit`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetPostEditByIdResponse>
        });
}
