import {PostPartId} from '../../../../entities/PostPart/types';
import {PostId} from '../../../../entities/Post/types';

import {
    POST_PAGE_DATA_FETCHED_ACTION,
    POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN,
    POST_PAGE_OPEN_PART,
    POST_PAGE_SCROLL_TO_PART,
    POST_PAGE_TOGGLE_PART,
    POST_PAGE_PUBLISH_SUCCESS,
    POST_PAGE_PUBLISH_FAIL,
} from './actions';

export interface PagePostState {
    postId: PostId;
    openParts: {
        [id: number]: boolean;
    };
    isPicPartsOpen: boolean;
}

export interface PostPageDataFetchedAction {
    type: typeof POST_PAGE_DATA_FETCHED_ACTION;
    payload: {id: PostId};
};

export interface PostPageToggleIsPicPartsOpenAction {
    type: typeof POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN;
};

export interface PostPageOpenPartAction {
    type: typeof POST_PAGE_OPEN_PART;
    payload: {
        id: PostPartId;
    }
};

export interface PostPageScrollToPartAction {
    type: typeof POST_PAGE_SCROLL_TO_PART;
    payload: {
        id: PostPartId;
    }
}

export interface PostPageTogglePartAction {
    type: typeof POST_PAGE_TOGGLE_PART;
    payload: {
        id: PostPartId;
    }
};

export interface PostPagePublishSuccessAction {
    type: typeof POST_PAGE_PUBLISH_SUCCESS;
    payload: {
        id: PostId;
    }
};

export interface PostPagePublishFailAction {
    type: typeof POST_PAGE_PUBLISH_FAIL;
}

export type PostPageActionType =
    | PostPageDataFetchedAction
    | PostPageToggleIsPicPartsOpenAction
    | PostPageOpenPartAction
    | PostPageTogglePartAction
    | PostPagePublishSuccessAction
    | PostPagePublishFailAction
    ;
