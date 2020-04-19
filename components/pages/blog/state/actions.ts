import {BlogLogin, Blog} from '../../../../entities/Blog/types';
import {getBlogByName, postBlog} from '../../../../entities/Blog/api';
import {notificationShowSuccessAction, notificationShowErrorAction} from '../../../../entities/Notification/actions';
import {BlogExtra} from '../../../../entities/BlogExtra/types';
import {postsBaseDataFetchedAction} from '../../../../entities/Post/actions';
import {blogExtraMorePostsFetchedAction} from '../../../../entities/BlogExtra/actions';
import {AppState} from '../../../../store';

import {
    PageBlogFetchSuccessAction,
    PageBlogFetchMoreSuccessAction,
    PageBlogFetchMoreFailAction,
    PageBlogEditCancelAction,
    PageBlogChangeFieldAction,
    PageBlogChangeImageFileAction,
    PageBlogSaveAction,
    PageBlogSaveSuccessActionPayload,
    PageBlogSaveSuccessAction,
    PageBlogSaveFailAction,
} from './types';

export const PAGE_BLOG_FETCH_SUCCESS = 'PAGE_BLOG_FETCH_SUCCESS';
export const PAGE_BLOG_FETCH_MORE = 'PAGE_BLOG_FETCH_MORE';
export const PAGE_BLOG_FETCH_MORE_SUCCESS = 'PAGE_BLOG_FETCH_MORE_SUCCESS';
export const PAGE_BLOG_FETCH_MORE_FAIL = 'PAGE_BLOG_FETCH_MORE_FAIL';
export const PAGE_BLOG_EDIT = 'PAGE_BLOG_EDIT';
export const PAGE_BLOG_EDIT_CANCEL = 'PAGE_BLOG_EDIT_CANCEL';
export const PAGE_BLOG_CHANGE_FIELD = 'PAGE_BLOG_CHANGE_FIELD';
export const PAGE_BLOG_CHANGE_IMAGE_FILE = 'PAGE_BLOG_CHANGE_IMAGE_FILE';
export const PAGE_BLOG_SAVE = 'PAGE_BLOG_SAVE';
export const PAGE_BLOG_SAVE_SUCCESS = 'PAGE_BLOG_SAVE_SUCCESS';
export const PAGE_BLOG_SAVE_FAIL = 'PAGE_BLOG_SAVE_FAIL';

export const pageBlogFetchSuccessAction = (blogLogin: BlogLogin): PageBlogFetchSuccessAction => ({
    type: PAGE_BLOG_FETCH_SUCCESS,
    payload: {blogLogin},
});

export const pageBlogFetchMoreAction = () => async (dispatch, getState) => {
    const state: AppState = getState();
    const {blogLogin} = state.pageBlog;
    const blogExtra = state.blogExtra.items[blogLogin] as BlogExtra;
    const postsCount = blogExtra.postIds.length;

    dispatch({type: PAGE_BLOG_FETCH_MORE});
    try {
        const {blogExtra, postsBase} = await getBlogByName(blogLogin, postsCount);
        const {postIds} = blogExtra;
        dispatch(postsBaseDataFetchedAction(postsBase));
        dispatch(blogExtraMorePostsFetchedAction(blogLogin, postIds));
        dispatch(pageBlogFetchMoreSuccessAction());
    } catch (e) {
        dispatch(pageBlogFetchMoreFailAction());
    }
};

const pageBlogFetchMoreSuccessAction = (): PageBlogFetchMoreSuccessAction => ({
    type: PAGE_BLOG_FETCH_MORE_SUCCESS,
});

const pageBlogFetchMoreFailAction = (): PageBlogFetchMoreFailAction => ({
    type: PAGE_BLOG_FETCH_MORE_FAIL,
});

export const pageBlogEditAction = () => (dispatch, getState) => {
    const state: AppState = getState();
    const currentBlogLogin = state.pageBlog.blogLogin;
    const blogData: Blog = state.blog.items[currentBlogLogin];
    const blogExtraData: BlogExtra = state.blogExtra.items[currentBlogLogin];

    dispatch({
        type: PAGE_BLOG_EDIT,
        payload: {
            newImageUrl: blogData.imageUrl,
            newName: blogData.name,
            newInstagramLogin: blogExtraData.instagramLogin,
            newBio: blogExtraData.bio,
        },
    });
}

export const pageBlogEditCancelAction = (): PageBlogEditCancelAction => ({
    type: PAGE_BLOG_EDIT_CANCEL,
});

export type PageBlogEditField = 'newName' | 'newInstagramLogin' | 'newBio';
export const pageBlogChangeFieldAction = (field: PageBlogEditField, value: string): PageBlogChangeFieldAction => ({
    type: PAGE_BLOG_CHANGE_FIELD,
    payload: {field, value},
});

export const pageBlogChangeImageFileAction = (file: File, url: string): PageBlogChangeImageFileAction => ({
    type: PAGE_BLOG_CHANGE_IMAGE_FILE,
    payload: {file, url},
});

export const pageBlogSaveAction = () => async (dispatch, getState) => {
    dispatch({type: PAGE_BLOG_SAVE});

    const state: AppState = getState();

    const {
        newImageUrl,
        newImageFile,
        newName,
        newInstagramLogin,
        newBio,
    } = state.pageBlog.edit;

    try {
        const {status} = await postBlog({
            imageFile: newImageFile,
            name: newName,
            instagramLogin: newInstagramLogin,
            bio: newBio,
        });
        if (status !== 'success') {
            throw new Error();
        }

        dispatch(pageBlogSaveSuccessAction({
            blogLogin: state.pageBlog.blogLogin,
            newImageUrl,
            newName,
            newInstagramLogin,
            newBio,
        }));
        dispatch(notificationShowSuccessAction('Информация обновлена!'));
    } catch (e) {
        dispatch(pageBlogSaveFailAction());
        dispatch(notificationShowErrorAction('Не удалось сохранить :('));
        return;
    }
};

const pageBlogSaveSuccessAction = (payload: PageBlogSaveSuccessActionPayload): PageBlogSaveSuccessAction => ({
    type: PAGE_BLOG_SAVE_SUCCESS,
    payload,
});

const pageBlogSaveFailAction = (): PageBlogSaveFailAction => ({
    type: PAGE_BLOG_SAVE_FAIL,
});
