import {
    FunctionComponent,
    useCallback,
} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';

import {
    // TODO: add Action
    postEditFieldChange,
    postEditIsPublicChange,
    postEditSaveAction,
} from '../../store/actions';
import {PostEditFieldChangeName} from '../../store/types';

const styles = require('./styles.styl');

interface MappedProps {
    id?: PostId
    title: string
    instaPostId: string
    description: string
    isPublic: boolean
    canBePublic: boolean
    isSaving: boolean
}

interface ActionProps {
    postEditFieldChange(name: PostEditFieldChangeName, value: string): void;
    postEditIsPublicChange(value: boolean): void;
    saveAction(): void;
}

interface Props extends MappedProps, ActionProps {}

const PostEditInfo: FunctionComponent<Props> = (props: Props) => {
    const _saveAction = useCallback(props.saveAction, []);

    return (
        <Paper className={styles.root}>
            <TextField
                className={styles.input}
                label="Заголовок"
                variant="outlined"
                value={props.title}
                onChange={e => {props.postEditFieldChange('title', e.target.value)}}
            />
            <TextField
                className={styles.input}
                label="ID поста в инстаграме"
                variant="outlined"
                value={props.instaPostId}
                onChange={e => {props.postEditFieldChange('instaPostId', e.target.value)}}
            />
            <TextField
                className={styles.input}
                label="Описание"
                multiline
                rows={4}
                variant="outlined"
                value={props.description}
                onChange={e => {props.postEditFieldChange('description', e.target.value)}}
            />
            <FormControlLabel
                disabled={!props.canBePublic}
                control={
                    <Switch
                        checked={props.isPublic}
                        onChange={(e) => {props.postEditIsPublicChange(e.target.checked)}}
                    />
                }
                label="Опубликован"
            />
            {!props.canBePublic && (
                <div className={styles.warning}>Пост не может быть опубликован без продуктов</div>
            )}
            <Button
                className={styles.button}
                variant="contained"
                color="primary"
                disabled={props.isSaving}
                onClick={_saveAction}
            >
                {props.id ? 'Сохранить' : 'Создать'}
            </Button>
            <Link
                href="/post/[id]"
                as={`/post/${props.id}`}
            >
                <Button
                    className={styles.button}
                    variant="contained"
                    color="primary"
                    disabled={!props.id}
                >
                    Открыть
                </Button>
            </Link>
        </Paper>
    );
};

function mapStateToProps(state: AppState): MappedProps {
    const {isSaving, postEdit, postPartIds} = state.pagePostEdit;
    const {id, title, instaPostId, description, isPublic} = postEdit;

    const postPartItems = state.postPart.items;
    const canBePublic = postPartIds
        .some(postPartId => postPartItems[postPartId].postPartProductIds.length > 0);

    return {id, title, instaPostId, description, isPublic, canBePublic, isSaving};
}

const mapDispatchToProps = {
    postEditFieldChange,
    postEditIsPublicChange,
    saveAction: postEditSaveAction,
};

const ConnectedPostEditInfo = connect(mapStateToProps, mapDispatchToProps)(PostEditInfo);

export default ConnectedPostEditInfo;
