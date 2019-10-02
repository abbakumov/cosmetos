import {PostPartId, PostPart} from '../../../../entities/PostPart/types';
import {PostEdit} from '../../../../entities/PostEdit/types';

import {
    POST_EDIT_PAGE_DATA_FETCHED
} from './actions';

export interface PagePostEditState {
    postEdit: PostEdit;
    postPartIds: PostPartId[];
    postPartItems: {
        [id: number]: PostPart;
    };
}

export interface PostEditPageDataFetchedAction {
    type: typeof POST_EDIT_PAGE_DATA_FETCHED;
    payload: {
        postEdit: PostEdit;
        postPartIds: PostPartId[];
        postPartItems: {
            [id: number]: PostPart;
        };
    }
}

export type PagePostEditActionType =
    | PostEditPageDataFetchedAction;
