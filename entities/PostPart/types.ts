import {ProductId} from '../ProductBase/types';
import {Position} from '../Position';

type PostPartId = number;

export interface PostPart {
    id: PostPartId;
    title: string;
    position: Position;
    color: string;
    productIds: ProductId[];
}
