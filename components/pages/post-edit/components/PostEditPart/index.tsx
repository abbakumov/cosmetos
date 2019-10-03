import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';

import {PostPart, PostPartId} from '../../../../../entities/PostPart/types';
import {AppState} from '../../../../../store';

const styles = require('./styles.styl');

interface PostEditPartProps {
    id: PostPartId;
}

interface Props extends PostPart {}

const PostEditPart: FunctionComponent<Props> = (props: Props) => (
    <Paper className={styles.root}>

    </Paper>
);

function mapStateToProps(state: AppState, ownProps: PostEditPartProps): Props {
    const postPart = state.postPart.items[ownProps.id];

    return {
        ...postPart,
    };
}

const ConnectedPostEditPart = connect(mapStateToProps)(PostEditPart);

export default ConnectedPostEditPart;
