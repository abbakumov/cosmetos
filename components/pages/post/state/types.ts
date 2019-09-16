import {
    POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN,
    POST_PAGE_OPEN_PART,
    POST_PAGE_TOGGLE_PART,
} from './actions';
import {PostPartId} from '../../../../entities/PostPart/types';

export interface PagePostState {
    openParts: {
        [id: number]: boolean;
    };
    isPicPartsOpen: boolean;
}

export interface PostPageToggleIsPicPartsOpenAction {
    type: typeof POST_PAGE_TOGGLE_IS_PIC_PARTS_OPEN;
};

export interface PostPageOpenPartAction {
    type: typeof POST_PAGE_OPEN_PART;
    payload: {
        id: PostPartId;
    }
};

export interface PostPageTogglePartAction {
    type: typeof POST_PAGE_TOGGLE_PART;
    payload: {
        id: PostPartId;
    }
};

export type PostPageActionType =
    | PostPageToggleIsPicPartsOpenAction
    | PostPageOpenPartAction
    | PostPageTogglePartAction;
