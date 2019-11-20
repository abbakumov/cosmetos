import {
    NOTIFICATION_SHOW_SUCCESS,
    NOTIFICATION_SHOW_INFO,
    NOTIFICATION_SHOW_ERROR,
    NOTIFICATION_HIDE,
} from './actions';

export type NotificationType = 'success' | 'info' | 'error';

export interface NotificationState {
    text?: string;
    type?: NotificationType;
}

export interface NotificationShowSuccessAction {
    type: typeof NOTIFICATION_SHOW_SUCCESS;
    payload: {
        text: string;
    };
}

export interface NotificationShowInfoAction {
    type: typeof NOTIFICATION_SHOW_INFO;
    payload: {
        text: string;
    };
}

export interface NotificationShowErrorAction {
    type: typeof NOTIFICATION_SHOW_ERROR;
    payload: {
        text: string;
    };
}

export interface NotificationHideAction {
    type: typeof NOTIFICATION_HIDE;
}

export type NotificationAction =
    | NotificationShowSuccessAction
    | NotificationShowInfoAction
    | NotificationShowErrorAction
    | NotificationHideAction
    ;
