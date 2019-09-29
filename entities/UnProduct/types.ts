import {ProductId} from '../ProductBase/types';
import {BrandId} from '../Brand/types';

export type UnProductId = number;

export interface UnProduct {
    id: UnProductId;
    brandId?: BrandId;
    brandText: string;
    productId: ProductId;
    productText: string;
    colorText: string;
}
