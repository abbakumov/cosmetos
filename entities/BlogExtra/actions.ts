import {BlogLogin} from '../Blog/types';
import {PostId} from '../Post/types';

import {BlogExtra, BlogExtraDataFetchedAction, BlogExtraMorePostsFetchedAction} from './types';

export const BLOG_EXTRA_DATA_FETCHED = 'BLOG_EXTRA_DATA_FETCHED';
export const BLOG_EXTRA_MORE_POSTS_FETCHED = 'BLOG_EXTRA_MORE_POSTS_FETCHED';

export const blogExtraDataFetchedAction = (data: BlogExtra): BlogExtraDataFetchedAction => ({
    type: BLOG_EXTRA_DATA_FETCHED,
    payload: {data},
});

export const blogExtraMorePostsFetchedAction = (login: BlogLogin, postIds: PostId[]): BlogExtraMorePostsFetchedAction => ({
    type: BLOG_EXTRA_MORE_POSTS_FETCHED,
    payload: {login, postIds},
})
