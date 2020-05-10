import _ from 'lodash';

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
    }

    return state;
}
