import fetchData from '../../src/helpers/fetchData';
import {getOrigin} from '../../configs/location';

import {ProductExtra} from '../ProductExtra/types';
import {ProductColor} from '../ProductColor/types';
import {ProductId} from '../ProductBase/types';

export interface GetProductColorsResponse {
    productExtra: ProductExtra
    productColor: ProductColor[]
}

export const getProductColors = (id: ProductId): Promise<GetProductColorsResponse> =>
    fetchData(`${getOrigin()}/api/product/${id}/colors`);
