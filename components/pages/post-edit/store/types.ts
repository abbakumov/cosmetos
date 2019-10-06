import {PostPartId, PostPart} from '../../../../entities/PostPart/types';
import {PostEdit} from '../../../../entities/PostEdit/types';
import {PostId} from '../../../../entities/PostBase/types';

import {
    POST_EDIT_PAGE_DATA_FETCHED
} from './actions';

export interface PagePostEditState {
    postEdit: PostEdit;
    // separate from postEdit for easier state management
    postPartIds: PostPartId[];
    editPostPart?: PostPart;
}

export interface PostEditPageData {
    postEdit: PostEdit;
    postPartIds: PostPartId[];
}

export interface PostEditPageDataFetchedAction {
    type: typeof POST_EDIT_PAGE_DATA_FETCHED;
    payload: PostEditPageData;
}

export type PagePostEditActionType =
    | PostEditPageDataFetchedAction;
