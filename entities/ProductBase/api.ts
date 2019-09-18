import fetch from 'isomorphic-fetch';

import {ProductBase, ProductId} from './types';
import {Blog} from '../Blog/types';
import {BlogProduct} from '../BlogProduct/types';
import {PostBase} from '../PostBase/types';
import {ProductExtra} from '../ProductExtra/types';
import {ProductColor} from '../ProductColor/types';

export interface GetProductByIdResponse {
    productBase: ProductBase;
    productExtra: ProductExtra;
    productColor: {
        [id: number]: ProductColor;
    };
    postBase: {
        [id: number]: PostBase;
    };
    blog: {
        [login: string]: Blog;
    };
    blogProduct: {
        [id: number]: BlogProduct,
    };
}

export function getProductById(id: ProductId): Promise<GetProductByIdResponse> {
    return fetch(`http://localhost:3000/api/product/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetProductByIdResponse>
        });
}
