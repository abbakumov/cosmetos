import {
    POST_EDIT_PRODUCT_SAVE_SUCCESS, POST_EDIT_PRODUCT_REMOVE_SUCCESS,
} from '../../components/pages/post-edit/store/actions';
import {getProductType, getProductId} from '../AbstractProduct/helpers';
import {AbstractProductType} from '../AbstractProduct/types';

import {PostProductState, PostProductActionType} from './types';
import {
    POST_PRODUCTS_DATA_FETCHED,
} from './actions';
import {ProductId} from '../ProductBase/types';

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
            const addedProductType: AbstractProductType = getProductType(action.payload.productId);
            if (addedProductType === 'UNASSIGNED') { return state; }

            const addedProductId: ProductId = getProductId(action.payload.productId);
            return {
                items: {
                    ...state.items,
                    [action.payload.postPartProductId]: {
                        id: action.payload.postPartProductId,
                        postId: action.payload.postId,
                        productId: addedProductId,
                        productColorId: action.payload.productColorId,
                    },
                },
            };

        case POST_EDIT_PRODUCT_REMOVE_SUCCESS:
            const removedProductType: AbstractProductType = getProductType(action.payload.productId);
            if (removedProductType === 'UNASSIGNED') { return state; }

            const removedProductId: ProductId = getProductId(action.payload.productId);
            const newItems = Object.values(state.items).filter(item => item.productId !== removedProductId);
            return {items: newItems};
    }

    return state;
}
