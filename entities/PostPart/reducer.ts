import {PostPartState, PostPartActionType} from './types';
import {
    POST_PARTS_DATA_FETCHED,
} from './actions';
import {
    POST_EDIT_PRODUCT_SAVE_SUCCESS,
    POST_EDIT_PART_SAVE_SUCCESS,
} from '../../components/pages/post-edit/store/actions';

const initialState: PostPartState = {
    items: {},
};

export function postPartReducer(state = initialState, action: PostPartActionType): PostPartState {
    switch (action.type) {
        case POST_PARTS_DATA_FETCHED:
            return {
                ...state,
                items: {
                    ...state.items,
                    ...action.payload.data,
                },
            };

        case POST_EDIT_PRODUCT_SAVE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.postPartId]: {
                        ...state.items[action.payload.postPartId],
                        productIds: [
                            ...state.items[action.payload.postPartId].productIds,
                            action.payload.productId,
                        ],
                    },
                },
            };

        case POST_EDIT_PART_SAVE_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.data.id]: action.payload.data,
                },
            };
    }

    return state;
}
