import {PAGE_ADMIN_BRANDS_SAVE_SUCCESS} from '../../components/pages/admin/brands/store/actions';

import {
    BrandState,
    BrandAction,
} from './types';

import {
    BRANDS_DATA_FETCHED,
} from './actions';

const initialState: BrandState = {
    items: {},
};

export function brandReducer(state: BrandState = initialState, action: BrandAction) {
    switch (action.type) {
        case BRANDS_DATA_FETCHED:
            return {
                items: {
                    ...state.items,
                    ...action.payload.data,
                },
            };

        case PAGE_ADMIN_BRANDS_SAVE_SUCCESS:
            return {
                items: {
                    ...state.items,
                    [action.payload.brand.id]: action.payload.brand,
                },
            }
    }

    return state;
}
