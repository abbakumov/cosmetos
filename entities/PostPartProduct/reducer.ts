import {UN_PRODUCT_REMOVE_SUCCESS} from '../UnProduct/actions';
import {
    POST_EDIT_PRODUCT_SAVE_SUCCESS_AS,
    POST_EDIT_PRODUCT_SAVE_SUCCESS_UN,
} from '../../components/pages/post-edit/store/actions';

import {PostPartProductState, PostPartProductAction} from './types';
import {
    POST_PART_PRODUCTS_DATA_FETCHED,
} from './actions';

const optionalPostPartProductFields = {
    productId: null,
    productColorId: null,
    unProductId: null,
};

const initialState: PostPartProductState = {
    items: {},
};

export function postPartProductReducer(state = initialState, action: PostPartProductAction): PostPartProductState {
    switch (action.type) {
        case POST_PART_PRODUCTS_DATA_FETCHED:
            return {
                ...state,
                items: {
                    ...state.items,
                    ...action.payload.items,
                },
            };

        case UN_PRODUCT_REMOVE_SUCCESS:
            const newItems = {...state.items};
            delete newItems[action.payload.postPartProductId];

            return {
                ...state,
                items: newItems,
            };

        case POST_EDIT_PRODUCT_SAVE_SUCCESS_AS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.postPartProductId]: {
                        ...optionalPostPartProductFields,
                        id: action.payload.postPartProductId,
                        postId: action.payload.postId,
                        productId: action.payload.productId,
                        productColorId: action.payload.productColorId,
                    },
                },
            };

        case POST_EDIT_PRODUCT_SAVE_SUCCESS_UN:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.postPartProductId]: {
                        ...optionalPostPartProductFields,
                        id: action.payload.postPartProductId,
                        postId: action.payload.postId,
                        unProductId: action.payload.unProductId,
                    },
                },
            };
    }

    return state;
}
