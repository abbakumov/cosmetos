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
    }

    return state;
}
