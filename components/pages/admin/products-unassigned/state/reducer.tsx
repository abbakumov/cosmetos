import {
    PageAdminProductsUnassignedState,
    PageAdminUnProductsActionType,
} from './types';

import {
    PAGE_ADM_PROD_UN_DATA_FETCHED,
    PAGE_ADM_PROD_UN_OPEN_PRODUCT,
    PAGE_ADM_PROD_UN_SAVE_PRODUCT,
    PAGE_ADM_PROD_UN_SEARCH_PRODUCT,
} from './actions';

const initialState: PageAdminProductsUnassignedState = {
    unProductIds: [],
    activeUnProductId: null,
    activeSearchId: null,
    activeProductColorId: null,
}

export function pageAdminProductsUnassignedReducer(state = initialState, action: PageAdminUnProductsActionType) {
    switch (action.type) {
        case PAGE_ADM_PROD_UN_DATA_FETCHED:
            return {
                ...state,
                unProductIds: action.payload.unProductIds,
            };

        case PAGE_ADM_PROD_UN_OPEN_PRODUCT:
            return state;

        case PAGE_ADM_PROD_UN_SAVE_PRODUCT:
            return state;

        case PAGE_ADM_PROD_UN_SEARCH_PRODUCT:
            return state;
    }

    return state;
}
