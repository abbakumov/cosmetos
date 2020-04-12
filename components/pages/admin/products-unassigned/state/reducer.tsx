import _ from 'lodash';
import {
    PageAdminUnProductsState,
    PageAdminUnProductsActionType,
} from './types';

import {
    PAGE_ADM_PROD_UN_DATA_FETCHED,
    PAGE_ADM_PROD_UN_OPEN_PRODUCT,
    PAGE_ADM_PROD_UN_CLOSE_PRODUCT,
    PAGE_ADM_PROD_UN_SAVE_PRODUCT,
    PAGE_ADM_PROD_UN_CHANGE_TEXT,
    PAGE_ADM_PROD_UN_CHANGE_VALUE,
} from './actions';

const initialState: PageAdminUnProductsState = {
    unProductIds: [],
    activeUnProductId: null,
    activeBrandId: null,
    activeBrandText: '',
    activeProductId: null,
    activeProductText: '',
    activeProductColorId: null,
    activeProductColorText: '',
}

export function pageAdminUnProductsReducer(state = initialState, action: PageAdminUnProductsActionType) {
    switch (action.type) {
        case PAGE_ADM_PROD_UN_DATA_FETCHED:
            return {
                ...state,
                unProductIds: action.payload.unProductIds,
            };

        case PAGE_ADM_PROD_UN_OPEN_PRODUCT:
            return {
                ...state,
                activeUnProductId: action.payload.id,
                ..._.pick(action.payload, ['activeBrandId', 'activeProductId']),
                activeProductColorId: null,
            };

        case PAGE_ADM_PROD_UN_CLOSE_PRODUCT:
            return {
                ...state,
                activeUnProductId: null,
            };

        case PAGE_ADM_PROD_UN_SAVE_PRODUCT:
            return state;

        case PAGE_ADM_PROD_UN_CHANGE_TEXT:
            return {
                ...state,
                [action.payload.field]: action.payload.text,
            };

        case PAGE_ADM_PROD_UN_CHANGE_VALUE:
            return {
                ...state,
                [action.payload.field]: action.payload.value,
                activeBrandText: '',
                activeProductText: '',
                activeProductColorText: '',
            };
    }

    return state;
}
