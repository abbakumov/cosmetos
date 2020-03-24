import {
    PostEditProductSaveSuccessAsAction,
    PostEditProductSaveSuccessUnAction,
    PostEditPartSaveSuccessAction,
    PostEditProductRemoveSuccess,
} from '../../components/pages/post-edit/store/types';

import {AbstractProductId} from '../AbstractProduct/types';
import {UnProductRemoveSuccessAction} from '../UnProduct/types';
import {Position} from '../Position';

import {POST_PARTS_DATA_FETCHED} from './actions';

export type PostPartId = number;

export interface PostPart {
    id: PostPartId;
    title: string;
    position: Position;
    color: string;
    productIds: AbstractProductId[];
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
    | PostEditProductSaveSuccessAsAction
    | PostEditProductSaveSuccessUnAction
    | PostEditPartSaveSuccessAction
    | PostEditProductRemoveSuccess
    | UnProductRemoveSuccessAction
    ;

export interface PostPartState {
    items: {
        [s: number]: PostPart;
    }
};
