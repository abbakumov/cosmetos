import {PostPartId} from '../../../../entities/PostPart/types';
import {AppState} from '../../../../store';
import {PostId} from '../../../../entities/Post/types';
import {publishPost} from '../../../../entities/Post/api';

import {
    PostPageDataFetchedAction,
    PostPageToggleIsPicPartsOpenAction,
    PostPageOpenPartAction,
    PostPageScrollToPartAction,
    PostPageTogglePartAction,
    PostPagePublishSuccessAction,
    PostPagePublishFailAction,
} from './types';

export const POST_PAGE_DATA_FETCHED_ACTION = 'POST_PAGE_DATA_FETCHED_ACTION';
export const POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN = 'POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN';
export const POST_PAGE_OPEN_PART = 'POST_PAGE_OPEN_PART';
export const POST_PAGE_SCROLL_TO_PART = 'POST_PAGE_SCROLL_TO_PART';
export const POST_PAGE_TOGGLE_PART = 'POST_PAGE_TOGGLE_PART';
export const POST_PAGE_PUBLISH = 'POST_PAGE_PUBLISH';
export const POST_PAGE_PUBLISH_SUCCESS = 'POST_PAGE_PUBLISH_SUCCESS';
export const POST_PAGE_PUBLISH_FAIL = 'POST_PAGE_PUBLISH_FAIL';

export const postPageDataFetchedAction = (id: PostId): PostPageDataFetchedAction => ({
    type: POST_PAGE_DATA_FETCHED_ACTION,
    payload: {id},
});

export const postPageToggleIsPicPartsOpenAction = (): PostPageToggleIsPicPartsOpenAction => ({
    type: POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN,
});

export const postPageOpenPartAction = (id: PostPartId): PostPageOpenPartAction => ({
    type: POST_PAGE_OPEN_PART,
    payload: {id},
});

export const postPageScrollToPartAction = (id: PostPartId): PostPageScrollToPartAction => ({
    type: POST_PAGE_SCROLL_TO_PART,
    payload: {id},
});

export const postPageOpenScrollPartAction = (id: PostPartId) => async (dispatch) => {
    dispatch(postPageOpenPartAction(id));
    await new Promise(resolve => setTimeout(() => {resolve()}, 200));
    dispatch(postPageScrollToPartAction(id));
};

export const postPageTogglePartAction = (id: PostPartId): PostPageTogglePartAction => ({
    type: POST_PAGE_TOGGLE_PART,
    payload: {id},
});

const postPagePublishSuccessAction = (id: PostId): PostPagePublishSuccessAction => ({
    type: POST_PAGE_PUBLISH_SUCCESS,
    payload: {id}
});

const postPagePublishFailAction = (): PostPagePublishFailAction => ({
    type: POST_PAGE_PUBLISH_FAIL,
});

export const postPagePublishAction = () => async (dispatch, getState) => {
    const state: AppState = getState();
    const {postId} = state.pagePost;

    const {status} = await publishPost(postId);

    if (status === 'success') {
        dispatch(postPagePublishSuccessAction(postId));
    } else {
        dispatch(postPagePublishFailAction());
    }
};
