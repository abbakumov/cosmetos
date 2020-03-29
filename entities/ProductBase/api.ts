import querystring from 'query-string';
import _ from 'lodash';

import {ICosPageContext} from '../../types/context';
import fetchData from '../../src/helpers/fetchData';

import {getOrigin} from '../../configs/location';

import {ProductBase, ProductId} from './types';
import {BlogMap, BlogLogin} from '../Blog/types';
import {BlogProduct} from '../BlogProduct/types';
import {PostBase} from '../Post/types';
import {ProductExtra} from '../ProductExtra/types';
import {ProductColor} from '../ProductColor/types';
import {BrandId, BrandMap} from '../Brand/types';
import {ProductColorMap} from '../ProductColor/types';
import {PostProductMap} from '../PostProduct/types';
import {ProductEdit} from '../../components/pages/admin/product/store/types';

export interface GetProductByIdResponse {
    productBase: ProductBase
    productExtra: ProductExtra
    postProduct: PostProductMap
    productColor: {
        [id: number]: ProductColor
    }
    postBase: {
        [id: number]: PostBase
    }
    blog: {
        data: BlogMap
        currentLogin: BlogLogin
    }
    blogProduct: {
        [id: number]: BlogProduct
    }
}

export const getProductById = (id: ProductId, context?: ICosPageContext): Promise<GetProductByIdResponse> =>
    fetchData(
        `${getOrigin()}/api/product/${id}`,
        {},
        context
    );

interface GetAdminProductsResponse {
    total: number;
    ids: ProductId[];
    product: {
        [id: number]: ProductBase;
    };
}
export interface GetAdminProductsParams {
    filterTitle?: string;
    offset?: number;
    limit?: number;
}
const defaultParams = {
    limit: 25,
};
export function getAdminProducts(
        _params: GetAdminProductsParams = {},
        context?: ICosPageContext
    ): Promise<GetAdminProductsResponse> {
        const params = _.defaults(_params, defaultParams);
        const notEmptyParams = Object.keys(params)
            .filter(param => params[param])
            .reduce(
                (acc, param) => ({
                    ...acc,
                    [param]: params[param],
                }),
                {}
            );

        const qs = querystring.stringify(notEmptyParams);
        return fetchData<GetAdminProductsResponse>(
            `${getOrigin()}/api/admin/product/${qs.length ? '?' + qs : ''}`,
            {},
            context
        );
    }


export interface GetAdminProductByIdResponse {
    product: ProductEdit;
    brandIds: BrandId[];
    brand: BrandMap;
    productColor: ProductColorMap;
}
export const getAdminProductById = (id: ProductId, context: ICosPageContext): Promise<GetAdminProductByIdResponse> =>
    fetchData<GetAdminProductByIdResponse>(
        `${getOrigin()}/api/admin/product/${id}`,
        {},
        context
    );


export interface PostAdminProductResponse {
    status: 'saccess' | 'fail',
    productId: ProductId;
}
export const postAdminProduct = (data: ProductEdit): Promise<PostAdminProductResponse> => {
    const formData = new FormData();

    if (data.id) {
        formData.append('id', String(data.id));
    }
    formData.append('title', data.title);
    formData.append('kind', data.kind);
    formData.append('description', data.description);
    formData.append('brandId', String(data.brandId));
    if (data.pictureFile) {
        formData.append('pictureFile', data.pictureFile);
    }

    return fetchData<PostAdminProductResponse>(
        `${getOrigin()}/api/admin/product`,
        {
            body: formData,
            method: 'POST',
        }
    );
}
