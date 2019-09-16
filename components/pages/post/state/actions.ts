import {
    PostPageToggleIsPicPartsOpenAction,
    PostPageOpenPartAction,
    PostPageTogglePartAction,
} from './types';
import {PostPartId} from '../../../../entities/PostPart/types';

export const POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN = 'POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN';
export const POST_PAGE_OPEN_PART = 'POST_PAGE_OPEN_PART';
export const POST_PAGE_TOGGLE_PART = 'POST_PAGE_TOGGLE_PART';

export const postPageToggleIsPicPartsOpenAction = (): PostPageToggleIsPicPartsOpenAction => ({
    type: POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN,
});

export const postPageOpenPartAction = (id: PostPartId): PostPageOpenPartAction => ({
    type: POST_PAGE_OPEN_PART,
    payload: {id},
});

export const postPageTogglePartAction = (id: PostPartId): PostPageTogglePartAction => ({
    type: POST_PAGE_TOGGLE_PART,
    payload: {id},
});
