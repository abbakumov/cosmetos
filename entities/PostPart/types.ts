import {
    PostEditProductSaveSuccessAction,
    PostEditPartSaveSuccessAction,
} from '../../components/pages/post-edit/store/types';

import {ProductId} from '../ProductBase/types';
import {Position} from '../Position';

import {POST_PARTS_DATA_FETCHED} from './actions';

export type PostPartId = number;

export interface PostPart {
    id: PostPartId;
    title: string;
    position: Position;
    color: string;
    productIds: ProductId[];
}

// ACTIONS ->
export interface PostPartsDataFetchedAction {
    type: typeof POST_PARTS_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: PostPart;
        }
    }
};
// <- ACTIONS

export type PostPartActionType =
    | PostPartsDataFetchedAction
    | PostEditProductSaveSuccessAction
    | PostEditPartSaveSuccessAction
    ;

export interface PostPartState {
    items: {
        [s: number]: PostPart;
    }
};
