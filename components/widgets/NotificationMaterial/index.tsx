import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';

import {AppState} from '../../../store';

const styles = require('./styles.styl');

interface Props {
    isActive: boolean;
    text: string;
    type: 'success' | 'info' | 'error';
}

const NotificationMaterial: FunctionComponent<Props> = (props: Props) => {
    let className;

    switch (props.type) {
        case 'success':
            className = styles.success;
            break;

        case 'info':
            className = styles.info;
            break;

        case 'error':
            className = styles.error;
            break;
    }

    return (
        <Snackbar
            className={className}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={props.isActive}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{props.text}</span>}
        />
    );
}

function mapStateToProps(state: AppState) {
    const {text, type} = state.notification;

    return {
        isActive: Boolean(text),
        text,
        type,
    };
}

const ConnectedNotificationMaterial = connect(mapStateToProps)(NotificationMaterial);

export default ConnectedNotificationMaterial;
