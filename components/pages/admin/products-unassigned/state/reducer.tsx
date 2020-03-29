import {
    PageAdminUnProductsState,
    PageAdminUnProductsActionType,
} from './types';

import {
    PAGE_ADM_PROD_UN_DATA_FETCHED,
    PAGE_ADM_PROD_UN_OPEN_PRODUCT,
    PAGE_ADM_PROD_UN_CLOSE_PRODUCT,
    PAGE_ADM_PROD_UN_SAVE_PRODUCT,
} from './actions';

const initialState: PageAdminUnProductsState = {
    unProductIds: [],
    activeUnProductId: null,
    activeBrandId: null,
    activeProductId: null,
    activeProductColorId: null,
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
            };

        case PAGE_ADM_PROD_UN_CLOSE_PRODUCT:
            return {
                ...state,
                activeUnProductId: null,
            };

        case PAGE_ADM_PROD_UN_SAVE_PRODUCT:
            return state;
    }

    return state;
}
