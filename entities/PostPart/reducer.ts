import {PostPartState, PostPartActionType} from './types';
import {
    POST_PARTS_DATA_FETCHED,
} from './actions';
import {
    POST_EDIT_PRODUCT_SAVE_SUCCESS
} from '../../components/pages/post-edit/store/actions';

const initialState: PostPartState = {
    items: {},
};

export function postPartReducer(state = initialState, action: PostPartActionType): PostPartState {
    switch (action.type) {
        case POST_PARTS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                },
            };

        case POST_EDIT_PRODUCT_SAVE_SUCCESS:
            return {
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
    }

    return state;
}
