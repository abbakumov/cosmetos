import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import {PostPartId} from '../../../../../entities/PostPart/types';
import {PostId} from '../../../../../entities/Post/types';
import {AppState} from '../../../../../store';

import {postEditPartNewAction} from '../../store/actions';

import PostEditPart from '../PostEditPart';
import PostEditPartEdit from '../PostEditPartEdit';

const styles = require('./styles.styl');

interface MappedProps {
    postId: PostId;
    partIds: PostPartId[];
    activeEditPartId: PostPartId;
}

interface ActionProps {
    postEditPartNewAction(): void;
}

interface Props extends MappedProps, ActionProps {}

const PostЕditParts: FunctionComponent<Props> = (props: Props) => (
    <div className={styles.root}>
        {Boolean(props.partIds.length) && (
            <div className={styles.container}>
                {props.partIds.map(id => (
                    <div key={id}>
                        {props.activeEditPartId !== id && <PostEditPart id={id} />}
                        {props.activeEditPartId === id && <PostEditPartEdit />}
                    </div>
                ))}
            </div>
        )}
        {!props.partIds.length && props.activeEditPartId === null && Boolean(props.postId) && (
            <Paper className={styles.placeholder}>
                <p>Добавьте первую область нажав "Добавить область"</p>
            </Paper>
        )}
        {!props.postId && (
            <Paper className={styles.placeholder}>
                <p>
                    Чтобы начать добавлять области, выберите фото,
                    <br/>
                    заполните информацию о посте, и сохраните его.
                </p>
            </Paper>
        )}
        {props.activeEditPartId === 0 &&
            <PostEditPartEdit />
        }
        {(props.activeEditPartId === null && props.postId) &&
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

    const postId = pagePostEdit.postEdit.id;
    const partIds = pagePostEdit.postPartIds;
    const activeEditPartId: PostPartId = pagePostEdit.editPostPart && pagePostEdit.editPostPart.id;

    return {
        postId,
        partIds,
        activeEditPartId,
    };
}

const mapDispatchToProps = {
    postEditPartNewAction,
};

const ConnectedPostЕditParts = connect(mapStateToProps, mapDispatchToProps)(PostЕditParts);

export default ConnectedPostЕditParts;
