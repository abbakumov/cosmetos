import {
    PageLoginState,
    PageLoginActionType,
} from './types';

import {
    PAGE_LOGIN_UPDATE_VALUE,
    PAGE_LOGIN_ENTER_SUCCESS,
} from './actions';

const initialState = {
    login: '',
    password: ''
};

export function pageLoginReducer(state: PageLoginState = initialState, action: PageLoginActionType): PageLoginState {
    switch (action.type) {
        case PAGE_LOGIN_UPDATE_VALUE:
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };

        case PAGE_LOGIN_ENTER_SUCCESS:
            return initialState;

    }

    return state;
}
