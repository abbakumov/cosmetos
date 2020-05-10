import _ from 'lodash';

import {PostPartState, PostPartActionType} from './types';
import {
    POST_PARTS_DATA_FETCHED,
} from './actions';
import {
    POST_EDIT_PRODUCT_SAVE_SUCCESS_AS,
    POST_EDIT_PRODUCT_SAVE_SUCCESS_UN,
    POST_EDIT_PART_SAVE_SUCCESS,
    POST_EDIT_PRODUCT_REMOVE_SUCCESS,
} from '../../components/pages/post-edit/store/actions';
import {UN_PRODUCT_REMOVE_SUCCESS} from '../UnProduct/actions';

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

        case POST_EDIT_PRODUCT_SAVE_SUCCESS_AS:
        case POST_EDIT_PRODUCT_SAVE_SUCCESS_UN:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.postPartId]: {
                        ...state.items[action.payload.postPartId],
                        postPartProductIds: [
                            ...state.items[action.payload.postPartId].postPartProductIds,
                            action.payload.postPartProductId,
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

        case POST_EDIT_PRODUCT_REMOVE_SUCCESS:
            const item = Object.values(state.items)
                .find(item => item.postPartProductIds.indexOf(action.payload.postPartProductId) !== -1);

            if (!item) {
                console.warn('No item found in POST_EDIT_PRODUCT_REMOVE_SUCCESS');
                return state;
            }

            return {
                ...state,
                items: {
                    ...state.items,
                    [item.id]: {
                        ...item,
                        postPartProductIds: item.postPartProductIds
                            .filter(_id => _id !== action.payload.postPartProductId),
                    },
                },
            };

        case UN_PRODUCT_REMOVE_SUCCESS:
            const newItemsArr = Object.values(state.items).map(item => ({
                ...item,
                postPartProductIds: item.postPartProductIds.filter(id => id !== action.payload.postPartProductId),
            }));
            return {
                ...state,
                items: _.keyBy(newItemsArr, 'id'),
            };
    }

    return state;
}
