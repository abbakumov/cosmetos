import fetch from 'isomorphic-fetch';

import {getOrigin} from '../../configs/location';

import {ProductBase, ProductId} from './types';
import {Blog} from '../Blog/types';
import {BlogProduct} from '../BlogProduct/types';
import {PostBase} from '../Post/types';
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
    return fetch(`${getOrigin()}/api/product/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetProductByIdResponse>
        });
}


export interface GetProductColorsResponse {
    productExtra: ProductExtra;
    productColor: ProductColor[];
}

export function getProductColors(id: ProductId): Promise<GetProductColorsResponse> {
    return fetch(`${getOrigin()}/api/product/${id}/colors`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<GetProductColorsResponse>
        });
}


interface GetAdminProductsResponse {
    productIds: ProductId[],
    productBase: {
        [id: number]: ProductBase;
    };
}

export function getAdminProducts(): Promise<GetAdminProductsResponse> {
    return Promise.resolve({
        productIds: [0],
        productBase: {},
    })
}


export interface GetAdminProductByIdResponse {
    productBase: ProductBase;
}

export function getAdminProductById(id: ProductId): Promise<GetAdminProductByIdResponse> {
    return Promise.resolve({
        productBase: {
            id: 1,
            brand: '',
            title: '',
            smallPicUrl: '',
        }
    });
}
