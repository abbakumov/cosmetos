import {
    PostEditPageDataFetchedAction,
    PostEditPageData,
} from './types';

export const POST_EDIT_PAGE_DATA_FETCHED = 'POST_EDIT_PAGE_DATA_FETCHED';

export function postEditDataFetchedAction(data: PostEditPageData): PostEditPageDataFetchedAction {
    return {
        type: POST_EDIT_PAGE_DATA_FETCHED,
        payload: data,
    }
}
