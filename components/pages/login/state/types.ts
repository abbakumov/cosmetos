import {
    PAGE_LOGIN_UPDATE_VALUE
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

export type PageLoginActionType =
    | PageLoginUpdateValue;
