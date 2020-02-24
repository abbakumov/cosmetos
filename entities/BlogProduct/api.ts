import {getOrigin} from '../../configs/location';
import fetchData from '../../src/helpers/fetchData';
import {ProductId} from '../ProductBase/types';

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
