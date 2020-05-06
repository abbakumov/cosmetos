import {getOrigin} from '../../configs/location';
import fetchData from '../../src/helpers/fetchData';
import {ProductId, ProductBaseMap} from '../ProductBase/types';
import {BlogProductId, BlogProductMap} from './types';
import {BlogsData} from '../Blog/types';

export interface PostProductCommentResponse {
    status: 'success' | 'fail'
    id: number
}
export const postProductComment = (productId: ProductId, text: string): Promise<PostProductCommentResponse> =>
    fetchData<PostProductCommentResponse>(
        `${getOrigin()}/api/product/${productId}/comment`,
        {
            method: 'POST',
            body: JSON.stringify({
                text,
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
    );

export interface GetMainReviewsResponse {
    blogProductIds: BlogProductId[]
    blog: BlogsData
    productBase: ProductBaseMap
    blogProduct: BlogProductMap
    isMoreAvailable: boolean
}
export const getMainReviews = (offset?: number): Promise<GetMainReviewsResponse> =>
    fetchData<GetMainReviewsResponse>(`${getOrigin()}/api/main/reviews?offset=${offset || 0}`);
