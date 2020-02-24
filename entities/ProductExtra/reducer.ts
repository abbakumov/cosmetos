import {PAGE_PRODUCT_SAVE_COMMENT_SUCCESS} from '../../components/pages/product/state/actions';

import {ProductExtraActionType, ProductExtraState} from './types';
import {
    PRODUCT_EXTRA_DATA_FETCHED,
} from './actions';

const initialState: ProductExtraState = {
    items: {},
};

export function productExtraReducer(state = initialState, action: ProductExtraActionType): ProductExtraState {

    switch (action.type) {
        case PRODUCT_EXTRA_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    [action.payload.data.id]: action.payload.data,
                }
            };

        case PAGE_PRODUCT_SAVE_COMMENT_SUCCESS:
            const item = state.items[action.payload.productId];

            if (action.payload.review && action.payload.review.length) {
                if (item.blogProductIds.indexOf(action.payload.id) === -1) {
                    // new
                    return {
                        ...state,
                        items: {
                            ...state.items,
                            [action.payload.productId]: {
                                ...state.items[action.payload.productId],
                                blogProductIds: [action.payload.id, ...state.items[action.payload.productId].blogProductIds],
                            },
                        },
                    };
                }
            } else {
                if (item.blogProductIds[0] !== action.payload.id) {
                    return state;
                }

                // remove
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.payload.productId]: {
                            ...state.items[action.payload.productId],
                            blogProductIds: state.items[action.payload.productId].blogProductIds.slice(1),
                        },
                    },
                }
            }
    }

    return state;
}
