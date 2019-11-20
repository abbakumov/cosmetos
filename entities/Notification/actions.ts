import {AppState} from '../../store';

import {
    NotificationHideAction,
} from './types';

export const NOTIFICATION_SHOW_SUCCESS = 'NOTIFICATION_SHOW_SUCCESS';
export const NOTIFICATION_SHOW_INFO = 'NOTIFICATION_SHOW_INFO';
export const NOTIFICATION_SHOW_ERROR = 'NOTIFICATION_SHOW_ERROR';
export const NOTIFICATION_HIDE = 'NOTIFICATION_HIDE';

function waitAndHideIfEqual(text, dispatch, getState) {
    setTimeout(
        () => {
            const state: AppState = getState();
            // hide notification
        },
        6000
    );
}

export const notificationShowSuccessAction = (text: string) => (dispatch, getState) => {
    dispatch({
        type: NOTIFICATION_SHOW_SUCCESS,
        payload: {text}
    });
    waitAndHideIfEqual(text, dispatch, getState);
};

export const notificationShowInfoAction = (text: string) => (dispatch, getState) => {
    dispatch({
        type: NOTIFICATION_SHOW_INFO,
        payload: {text}
    });
    waitAndHideIfEqual(text, dispatch, getState);
};

export const notificationShowErrorAction = (text: string) => (dispatch, getState) => {
    dispatch({
        type: NOTIFICATION_SHOW_ERROR,
        payload: {text}
    });
    waitAndHideIfEqual(text, dispatch, getState);
};

export const notificationHideAction = ():NotificationHideAction => ({
    type: NOTIFICATION_HIDE,
});
