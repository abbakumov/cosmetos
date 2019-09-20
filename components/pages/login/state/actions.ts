import {PageLoginUpdateValue} from "./types";

export const PAGE_LOGIN_UPDATE_VALUE = 'PAGE_LOGIN_UPDATE_VALUE';

export const pageLoginUpdateValue = (name: string, value: string): PageLoginUpdateValue => ({
    type: PAGE_LOGIN_UPDATE_VALUE,
    payload: {
        name,
        value,
    },
});
