import {
    PAGE_LOGIN_UPDATE_VALUE,
    PAGE_LOGIN_ENTER_SUCCESS,
} from './actions';

export interface PageLoginState {
    login: string;
    password: string;
}

export interface PageLoginUpdateValue {
    type: typeof PAGE_LOGIN_UPDATE_VALUE;
    payload: {
        name: string;
        value: string;
    }
}

export interface PageLoginEnterSuccess {
    type: typeof PAGE_LOGIN_ENTER_SUCCESS;
}

export type PageLoginActionType =
    | PageLoginUpdateValue
    | PageLoginEnterSuccess
    ;
