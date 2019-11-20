import {
    FunctionComponent,
    useCallback,
} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import {AppState} from '../../../../../store';

import {
    // TODO: add Action
    postEditFieldChange,
    postEditIsPublicChange,
    postEditSaveAction,
} from '../../store/actions';
import {PostEditFieldChangeName} from '../../store/types';

const styles = require('./styles.styl');

interface MappedProps {
    title: string;
    instaPostId: string;
    description: string;
    isPublic: boolean;
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
                label="instagram post id"
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
                control={
                    <Switch
                        checked={props.isPublic}
                        onChange={(e) => {props.postEditIsPublicChange(e.target.checked)}}
                    />
                }
                label="Опубликован"
            />
            <Button
                className={styles.saveButton}
                variant="contained"
                color="primary"
                onClick={_saveAction}
            >
                Сохранить
            </Button>
        </Paper>
    );
};

function mapStateToProps(state: AppState): MappedProps {
    const {title, instaPostId, description, isPublic} = state.pagePostEdit.postEdit;
    return {title, instaPostId, description, isPublic};
}

const mapDispatchToProps = {
    postEditFieldChange,
    postEditIsPublicChange,
    saveAction: postEditSaveAction,
};

const ConnectedPostEditInfo = connect(mapStateToProps, mapDispatchToProps)(PostEditInfo);

export default ConnectedPostEditInfo;
