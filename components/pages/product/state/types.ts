import {PostId} from '../../../../entities/Post/types';
import {ProductColorId} from '../../../../entities/ProductColor/types';
import {ProductId} from '../../../../entities/ProductBase/types';

import {
    PAGE_PRODUCT_DATA_FETCHED,
    PAGE_PRODUCT_SHOW_COLOR,
    PAGE_PRODUCT_HIDE_COLOR,
    PAGE_PRODUCT_EDIT_COMMENT,
    PAGE_PRODUCT_EDIT_COMMENT_CANCEL,
    PAGE_PRODUCT_COMMENT_CHANGE,
    PAGE_PRODUCT_SAVE_COMMENT,
    PAGE_PRODUCT_SAVE_COMMENT_SUCCESS,
    PAGE_PRODUCT_SAVE_COMMENT_FAIL,
    PAGE_PRODUCT_DELETE_COMMENT,
} from './actions';

export interface CommentEdit {
    text: string
    isSaving: boolean
}

export interface PageProductState {
    id?: ProductId
    refPost?: PostId
    activeColorId?: ProductColorId
    commentEdit?: CommentEdit
}

export interface PageProductDataFetchedAction {
    type: typeof PAGE_PRODUCT_DATA_FETCHED
    payload: {
        id: ProductId,
        refPost: PostId,
    }
};

export interface PageProductShowColorAction {
    type: typeof PAGE_PRODUCT_SHOW_COLOR
    payload: {
        colorId: ProductColorId
    }
}

export interface PageProductHideColorAction {
    type: typeof PAGE_PRODUCT_HIDE_COLOR
}

export interface PageProductEditCommentAction {
    type: typeof PAGE_PRODUCT_EDIT_COMMENT
    payload: {
        text?: string
    }
}

export interface PageProductEditCommentCancelAction {
    type: typeof PAGE_PRODUCT_EDIT_COMMENT_CANCEL
}

export interface PageProductCommentChangeAction {
    type: typeof PAGE_PRODUCT_COMMENT_CHANGE
    payload: {
        text: string
    }
}

export interface PageProductSaveCommentAction {
    type: typeof PAGE_PRODUCT_SAVE_COMMENT
}

export interface PageProductSaveCommentSuccessAction {
    type: typeof PAGE_PRODUCT_SAVE_COMMENT_SUCCESS
}

export interface PageProductSaveCommentFailAction {
    type: typeof PAGE_PRODUCT_SAVE_COMMENT_FAIL
}

export interface PageProductDeleteCommentAction {
    type: typeof PAGE_PRODUCT_DELETE_COMMENT
}


export type PageProductAction =
    | PageProductDataFetchedAction
    | PageProductShowColorAction
    | PageProductHideColorAction
    | PageProductEditCommentAction
    | PageProductEditCommentCancelAction
    | PageProductCommentChangeAction
    | PageProductSaveCommentAction
    | PageProductSaveCommentSuccessAction
    | PageProductSaveCommentFailAction
    | PageProductDeleteCommentAction
    ;
