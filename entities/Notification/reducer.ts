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
            return state;

        case NOTIFICATION_SHOW_INFO:
            return state;

        case NOTIFICATION_SHOW_ERROR:
            return state;

        case NOTIFICATION_HIDE:
            return state;

    }

    return state;
}
