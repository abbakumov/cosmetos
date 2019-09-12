import {PostBase, PostsBaseDataFetchedAction} from './types';

export const POSTS_BASE_DATA_FETCHED = 'POSTS_BASE_DATA_FETCHED';

export interface PostBaseMap {
    [id: number]: PostBase;
}

export const postsBaseDataFetchedAction = (data: PostBaseMap): PostsBaseDataFetchedAction => ({
    type: POSTS_BASE_DATA_FETCHED,
    payload: {data},
});

// export const postDataFetchedAction = (data: PostBase): BlogDataFetchedAction => ({
//     type: BLOG_DATA_FETCHED,
//     payload: {
//         data,
//     },
// });
