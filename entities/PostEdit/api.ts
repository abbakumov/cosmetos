import fetch from 'isomorphic-fetch';

import {PostId} from '../PostBase/types';
import {PostPart, PostPartId} from '../PostPart/types';
import {ProductBase} from '../ProductBase/types';
import {PostProduct} from '../PostProduct/types';
import {ProductExtra} from '../ProductExtra/types';
import {ProductColor} from '../ProductColor/types';
import {BrandMap} from '../Brand/types';

import {PostEdit} from './types';
import {getOrigin} from '../../configs/location';

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
    brand: BrandMap;
}

export function getPostEditById(id: PostId): Promise<GetPostEditByIdResponse> {
    return fetch(`${getOrigin()}/api/post/${id}/edit`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetPostEditByIdResponse>
        });
}
