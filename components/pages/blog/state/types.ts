import {BlogLogin} from '../../../../entities/Blog/types';

import {
    PAGE_BLOG_FETCH_SUCCESS,
    PAGE_BLOG_FETCH_MORE,
    PAGE_BLOG_FETCH_MORE_SUCCESS,
    PAGE_BLOG_FETCH_MORE_FAIL,
    PAGE_BLOG_EDIT,
    PAGE_BLOG_EDIT_CANCEL,
    PAGE_BLOG_CHANGE_FIELD,
    PAGE_BLOG_CHANGE_IMAGE_FILE,
    PAGE_BLOG_SAVE,
    PAGE_BLOG_SAVE_SUCCESS,
    PAGE_BLOG_SAVE_FAIL,
} from './actions';

export interface PageBlogState {
    blogLogin: BlogLogin
    isFetchingMore: boolean
    edit: {
        isActive: boolean
        newImageFile?: File
        newImageUrl: string
        newName: string
        newInstagramLogin: string
        newBio: string
    }
}

export interface PageBlogFetchSuccessAction {
    type: typeof PAGE_BLOG_FETCH_SUCCESS
    payload: {
        blogLogin: string
    }
}

export interface PageBlogFetchMoreAction {
    type: typeof PAGE_BLOG_FETCH_MORE
}

export interface PageBlogFetchMoreSuccessAction {
    type: typeof PAGE_BLOG_FETCH_MORE_SUCCESS
}

export interface PageBlogFetchMoreFailAction {
    type: typeof PAGE_BLOG_FETCH_MORE_FAIL
}

export interface PageBlogEditAction {
    type: typeof PAGE_BLOG_EDIT
}

export interface PageBlogEditCancelAction {
    type: typeof PAGE_BLOG_EDIT_CANCEL
}

export interface PageBlogChangeFieldAction {
    type: typeof PAGE_BLOG_CHANGE_FIELD
    payload: {
        field: string
        value: string
    }
}

export interface PageBlogChangeImageFileAction {
    type: typeof PAGE_BLOG_CHANGE_IMAGE_FILE
    payload: {
        file: File
        url: string
    }
}

export interface PageBlogSaveAction {
    type: typeof PAGE_BLOG_SAVE
}

export interface PageBlogSaveSuccessActionPayload {
    blogLogin: BlogLogin
    newImageUrl: string
    newName: string
    newInstagramLogin: string
    newBio: string
}
export interface PageBlogSaveSuccessAction {
    type: typeof PAGE_BLOG_SAVE_SUCCESS
    payload: PageBlogSaveSuccessActionPayload
}

export interface PageBlogSaveFailAction {
    type: typeof PAGE_BLOG_SAVE_FAIL
}

export type PageBlogAction =
    | PageBlogFetchSuccessAction
    | PageBlogFetchMoreAction
    | PageBlogFetchMoreSuccessAction
    | PageBlogFetchMoreFailAction
    | PageBlogEditAction
    | PageBlogEditCancelAction
    | PageBlogChangeFieldAction
    | PageBlogChangeImageFileAction
    | PageBlogSaveAction
    | PageBlogSaveSuccessAction
    | PageBlogSaveFailAction
    ;
