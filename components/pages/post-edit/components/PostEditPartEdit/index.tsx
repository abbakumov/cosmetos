import {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import {AppState} from '../../../../../store';

import {
    postEditPartChangeFieldAction,
    postEditPartSaveAction,
    postEditPartCancelAction,
} from '../../store/actions';

import colors from './colors';

const styles = require('./styles.styl');

interface MappedProps {
    title: string,
    activeColorHex: string,
}

interface ActionProps {
    postEditPartChangeFieldAction(name: 'color' | 'title', value: string): void;
    postEditPartSaveAction(): void;
    postEditPartCancelAction(): void;
}

interface Props extends MappedProps, ActionProps {}

const PostEditPartEdit: FunctionComponent<Props> = (props: Props) => (
    <Paper className={styles.root}>
        <div className={styles.controls}>
            <Button
                variant="contained"
                className={styles.control}
                size="small"
                color="secondary"
                onClick={() => props.postEditPartSaveAction()}
            >
                <Icon fontSize="small">done</Icon>
            </Button>
            <Button
                variant="contained"
                className={styles.control}
                size="small"
                color="secondary"
                onClick={() => props.postEditPartCancelAction()}
            >
                <Icon fontSize="small">cancel</Icon>
            </Button>
        </div>
        <Typography variant="subtitle2">
            Новая область
        </Typography>
        <div className={styles.content}>
            <TextField
                label="Название области"
                variant="outlined"
                value={props.title}
                onChange={e => props.postEditPartChangeFieldAction('title', e.target.value)}
            />
            <div className={styles.colors}>
                <Typography variant="subtitle2">
                    Цвет
                </Typography>
                <div className={styles.colorsItems}>
                    {colors.map(color => (
                        <div
                            key={color.hexColor}
                            className={cn(
                                styles.colorItem,
                                {[styles.colorItemActive]: color.hexColor === props.activeColorHex}
                            )}
                            onClick={() => props.postEditPartChangeFieldAction('color', color.hexColor)}
                            style={{
                                backgroundColor: `#${color.hexColor}`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    </Paper>
);

function mapStateToProps(state: AppState) {
    const {editPostPart} = state.pagePostEdit;

    return {
        title: editPostPart.title,
        activeColorHex: editPostPart.color,
    };
}

const mapDispatchToProps = {
    postEditPartChangeFieldAction,
    postEditPartSaveAction,
    postEditPartCancelAction,
};

const ConnectedPostEditPartEdit = connect(mapStateToProps, mapDispatchToProps)(PostEditPartEdit);

export default ConnectedPostEditPartEdit
