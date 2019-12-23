import {
    POST_EDIT_PRODUCT_SAVE_SUCCESS, POST_EDIT_PRODUCT_REMOVE_SUCCESS,
} from '../../components/pages/post-edit/store/actions';

import {PostProductState, PostProductActionType} from './types';
import {
    POST_PRODUCTS_DATA_FETCHED,
} from './actions';

const initialState: PostProductState = {
    items: {},
};

export function postProductReducer(state = initialState, action: PostProductActionType): PostProductState {
    switch (action.type) {
        case POST_PRODUCTS_DATA_FETCHED:
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
                    [action.payload.postPartProductId]: {
                        id: action.payload.postPartProductId,
                        postId: action.payload.postId,
                        productId: action.payload.productId,
                        productColorId: action.payload.productColorId,
                    },
                },
            };

        case POST_EDIT_PRODUCT_REMOVE_SUCCESS:
            const newItems = Object.values(state.items).filter(item => item.productId !== action.payload.productId);
            return {
                items: newItems,
            };
    }

    return state;
}
