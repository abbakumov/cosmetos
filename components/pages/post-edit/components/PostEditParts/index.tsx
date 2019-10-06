import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {PostPartId} from '../../../../../entities/PostPart/types';
import {AppState} from '../../../../../store';

import PostEditPart from '../PostEditPart';

const styles = require('./styles.styl');

interface Props {
    partIds: PostPartId[];
}

const PostЕditParts: FunctionComponent<Props> = (props: Props) => (
    <div className={styles.root}>
        <div className={styles.container}>
            {props.partIds.map(id => (
                <PostEditPart key={id} id={id} />
            ))}
        </div>
        <Paper className={styles.controls}>
            <Button variant="contained" color="primary">Добавить область</Button>
        </Paper>
    </div>
);

function mapStateToProps(state: AppState) {
    const partIds = state.pagePostEdit.postPartIds;

    return {
        partIds,
    };
}

const ConnectedPostЕditParts = connect(mapStateToProps)(PostЕditParts);

export default ConnectedPostЕditParts;
