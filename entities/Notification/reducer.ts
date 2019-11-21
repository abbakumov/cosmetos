import {
    NotificationState,
    NotificationAction,
} from './types';

import {
    NOTIFICATION_SHOW_SUCCESS,
    NOTIFICATION_SHOW_INFO,
    NOTIFICATION_SHOW_ERROR,
    NOTIFICATION_HIDE,
} from './actions';

const initialState: NotificationState = {
    text: null,
    type: null,
};

export function notificationReducer(state: NotificationState = initialState, action: NotificationAction) {
    switch (action.type) {
        case NOTIFICATION_SHOW_SUCCESS:
            return {
                text: action.payload.text,
                type: 'success',
            };

        case NOTIFICATION_SHOW_INFO:
            return {
                text: action.payload.text,
                type: 'info',
            };

        case NOTIFICATION_SHOW_ERROR:
            return {
                text: action.payload.text,
                type: 'error',
            };

        case NOTIFICATION_HIDE:
            return initialState;
    }

    return state;
}
