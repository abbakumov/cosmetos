import fetchData from '../../src/helpers/fetchData';

import {PostId} from '../Post/types';
import {PostPart, PostPartId} from '../PostPart/types';
import {ProductBaseMap} from '../ProductBase/types';
import {PostProduct} from '../PostProduct/types';
import {ProductExtraMap} from '../ProductExtra/types';
import {ProductColor} from '../ProductColor/types';
import {BrandMap} from '../Brand/types';

import {PostEdit} from './types';
import {getOrigin} from '../../configs/location';
import {ICosPageContext} from '../../types/context';

export interface GetPostEditByIdResponse {
    postEdit: PostEdit;
    postPartIds: PostPartId[];
    postProduct: {
        [id: number]: PostProduct;
    };
    postPart: {
        [id: number]: PostPart;
    };
    productBase: ProductBaseMap;
    productExtra: ProductExtraMap;
    productColor: {
        [id: number]: ProductColor;
    };
    brand: BrandMap;
}

export const getPostEditById = (id: PostId, context?: ICosPageContext): Promise<GetPostEditByIdResponse> =>
    fetchData<GetPostEditByIdResponse>(
        `${getOrigin()}/api/post/${id}/edit`,
        {},
        context
    );
