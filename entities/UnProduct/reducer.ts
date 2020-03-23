import _ from 'lodash';

import {
    POST_EDIT_PRODUCT_SAVE_SUCCESS_UN,
} from '../../components/pages/post-edit/store/actions';

import {
    UnProductState,
    UnProductAction,
} from './types';

import {
    UN_PRODUCTS_DATA_FETCHED,
    UN_PRODUCT_REMOVE_SUCCESS,
} from './actions';

const initialState: UnProductState = {
    items: {},
};

export function unProductReducer(state: UnProductState = initialState, action: UnProductAction) {
    switch (action.type) {
        case UN_PRODUCTS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                },
            };

        case POST_EDIT_PRODUCT_SAVE_SUCCESS_UN:
            return {
                items: {
                    ...state.items,
                    [action.payload.unProductId]: {
                        id: action.payload.unProductId,
                        ..._.pick(
                            action.payload,
                            [
                                'brandText',
                                'brandId',
                                'productText',
                                'productId',
                                'productColorText',
                            ]
                        ),
                    }
                },
            };

        case UN_PRODUCT_REMOVE_SUCCESS:
            const newItems = JSON.parse(JSON.stringify(state.items));
            delete newItems[action.payload.id];

            return {
                ...state,
                items: newItems,
            };
    }

    return state;
}
