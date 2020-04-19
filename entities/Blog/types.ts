import {PageBlogSaveSuccessAction} from '../../components/pages/blog/state/types';
import {
    BLOG_DATA_FETCHED,
    BLOGS_DATA_FETCHED,
} from './actions';

export type BlogLogin = string;

export interface Blog {
    login: BlogLogin;
    name?: string;
    imageUrl?: string,
};

export interface BlogMap {
    [id: number]: Blog;
}

// ACTIONS ->
export interface BlogDataFetchedAction {
    type: typeof BLOG_DATA_FETCHED;
    payload: {
        data: Blog;
    }
};
export interface BlogsDataFetchedAction {
    type: typeof BLOGS_DATA_FETCHED;
    payload: {
        data: {
            [id: number]: Blog;
        }
        currentLogin?: BlogLogin
    }
}
// <- ACTIONS

export type BlogActionType =
    | BlogDataFetchedAction
    | BlogsDataFetchedAction
    | PageBlogSaveSuccessAction
    ;

export interface BlogState {
    currentLogin?: BlogLogin;
    items: {
        [s: string]: Blog;
    }
};
