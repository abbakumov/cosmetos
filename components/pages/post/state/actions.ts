import {
    PostPageToggleIsPicPartsOpenAction,
    PostPageOpenPartAction,
    PostPageScrollToPartAction,
    PostPageTogglePartAction,
} from './types';
import {PostPartId} from '../../../../entities/PostPart/types';

export const POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN = 'POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN';
export const POST_PAGE_OPEN_PART = 'POST_PAGE_OPEN_PART';
export const POST_PAGE_SCROLL_TO_PART = 'POST_PAGE_SCROLL_TO_PART';
export const POST_PAGE_TOGGLE_PART = 'POST_PAGE_TOGGLE_PART';

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
})

export const postPageOpenScrollPartAction = (id: PostPartId) => async (dispatch) => {
    dispatch(postPageOpenPartAction(id));
    await new Promise(resolve => setTimeout(() => {resolve()}, 200));
    dispatch(postPageScrollToPartAction(id));
}

export const postPageTogglePartAction = (id: PostPartId): PostPageTogglePartAction => ({
    type: POST_PAGE_TOGGLE_PART,
    payload: {id},
});
