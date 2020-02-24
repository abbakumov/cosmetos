import _ from 'lodash';

import {
    PAGE_PRODUCT_SAVE_COMMENT_SUCCESS
} from '../../components/pages/product/state/actions';

import {BlogProductState, BlogProductActionType} from './types';
import {
    BLOG_PRODUCTS_DATA_FETCHED,
} from './actions';

const initialState: BlogProductState = {
    items: {},
};

export function blogProductReducer(state = initialState, action: BlogProductActionType): BlogProductState {
    switch (action.type) {
        case BLOG_PRODUCTS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                }
            };
        
        case PAGE_PRODUCT_SAVE_COMMENT_SUCCESS:
            if (action.payload.review && action.payload.review.length) {
                // change item or create
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [action.payload.id]: _.pick(action.payload, ['id', 'blogLogin', 'productId', 'review']),
                    },
                }
            } else {
                const itemsClone = JSON.parse(JSON.stringify(state.items));
                delete itemsClone[action.payload.id];

                return {
                    ...state,
                    items: itemsClone,
                };
            }
    }

    return state;
}
