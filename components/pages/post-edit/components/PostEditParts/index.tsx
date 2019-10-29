import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {PostPartId} from '../../../../../entities/PostPart/types';
import {AppState} from '../../../../../store';

import {postEditPartNewAction} from '../../store/actions';

import PostEditPart from '../PostEditPart';
import PostEditPartEdit from '../PostEditPartEdit';

const styles = require('./styles.styl');

interface MappedProps {
    partIds: PostPartId[];
    activeEditPartId: PostPartId;
}

interface ActionProps {
    postEditPartNewAction(): void;
}

interface Props extends MappedProps, ActionProps {}

const PostЕditParts: FunctionComponent<Props> = (props: Props) => (
    <div className={styles.root}>
        <div className={styles.container}>
            {props.partIds.map(id => (
                <PostEditPart key={id} id={id} />
            ))}
        </div>
        {props.activeEditPartId === 0 &&
            <PostEditPartEdit />
        }
        {props.activeEditPartId === null &&
            <Paper className={styles.controls}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.postEditPartNewAction()}
                >
                    Добавить область
                </Button>
            </Paper>
        }
    </div>
);

function mapStateToProps(state: AppState) {
    const {pagePostEdit} = state;

    const partIds = pagePostEdit.postPartIds;
    const activeEditPartId: PostPartId = pagePostEdit.editPostPart && pagePostEdit.editPostPart.id;

    return {
        partIds,
        activeEditPartId,
    };
}

const mapDispatchToProps = {
    postEditPartNewAction,
};

const ConnectedPostЕditParts = connect(mapStateToProps, mapDispatchToProps)(PostЕditParts);

export default ConnectedPostЕditParts;
