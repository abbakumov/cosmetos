import fetchData from '../../src/helpers/fetchData';

import {PostId} from '../Post/types';
import {PostPartId, PostPartMap} from '../PostPart/types';
import {ProductBaseMap} from '../ProductBase/types';
import {PostPartProductMap} from '../PostPartProduct/types';
import {UnProductMap} from '../UnProduct/types';
import {ProductExtraMap} from '../ProductExtra/types';
import {ProductColorMap} from '../ProductColor/types';
import {BrandMap} from '../Brand/types';

import {PostEdit} from './types';
import {getOrigin} from '../../configs/location';
import {ICosPageContext} from '../../types/context';

export interface GetPostEditByIdResponse {
    postEdit: PostEdit
    postPartIds: PostPartId[]
    postPartProduct: PostPartProductMap
    postPart: PostPartMap
    productBase: ProductBaseMap
    productExtra: ProductExtraMap
    unProduct: UnProductMap
    productColor: ProductColorMap
    brand: BrandMap
}

export const getPostEditById = (id: PostId, context?: ICosPageContext): Promise<GetPostEditByIdResponse> =>
    fetchData<GetPostEditByIdResponse>(
        `${getOrigin()}/api/post/${id}/edit`,
        {},
        context
    );
