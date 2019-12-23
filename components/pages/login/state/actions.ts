import {AppState} from '../../../../store';
import {
    notificationShowSuccessAction,
    notificationShowErrorAction,
} from '../../../../entities/Notification/actions';

import {PageLoginUpdateValue} from './types';
import {postLogin} from './api';

export const PAGE_LOGIN_UPDATE_VALUE = 'PAGE_LOGIN_UPDATE_VALUE';
export const PAGE_LOGIN_ENTER_SUCCESS = 'PAGE_LOGIN_ENTER_SUCCESS';

export const pageLoginUpdateValue = (name: string, value: string): PageLoginUpdateValue => ({
    type: PAGE_LOGIN_UPDATE_VALUE,
    payload: {
        name,
        value,
    },
});

export const pageLoginEnterAction = () => async (dispatch, getState) => {
    const state: AppState = getState();
    const {login, password} = state.pageLogin;

    let result;
    try {
        result = await postLogin(login, password);
    } catch (e) {
        dispatch(notificationShowErrorAction('Ошибка авторизации'));
        return;
    }

    if (result.status === 'success') {
        dispatch({type: PAGE_LOGIN_ENTER_SUCCESS});
        dispatch(notificationShowSuccessAction('Успешная авторизация'));
        if (result.isAdmin) {
            window.location.href = '/admin/product';
        } else {
            window.location.href = `/blog/${result.login}`;
        }
    } else {
        dispatch(notificationShowErrorAction('Неправильный login или пароль'));
    }
};
