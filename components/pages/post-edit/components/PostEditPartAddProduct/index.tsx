import {FunctionComponent, useCallback} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import {AppState} from '../../../../../store';

import PostEditPartProductDropDown from '../PostEditPartProductDropDown';

import {
    postEditProductCancelAction,
    postEditProductSaveAction,
} from '../../store/actions';

const styles = require('./styles.styl');

interface MappedProps {
    isSaving: boolean;
}

interface ActionProps {
    postEditProductCancelAction() : void;
    postEditProductSaveAction(): void;
}

interface Props extends MappedProps, ActionProps {}

const PostEditPartAddProduct: FunctionComponent<Props> = (props: Props) => {
    const _postEditProductCancelAction = useCallback(props.postEditProductCancelAction, []);
    const _postEditProductSaveAction = useCallback(props.postEditProductSaveAction, []);

    return (
        <div className={styles.root}>
            <div className={styles.head}>Добавление продукта</div>
            <div className={styles.content}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <PostEditPartProductDropDown id="brand" />
                    </Grid>
                    <Grid item xs={4}>
                        <PostEditPartProductDropDown id="product" />
                    </Grid>
                    <Grid item xs={4}>
                        <PostEditPartProductDropDown id="color" />
                    </Grid>
                </Grid>
                <div className={styles.bottomControls}>
                    <Button className={styles.control} onClick={_postEditProductCancelAction}>
                        Отмена
                    </Button>
                    <Button
                        className={styles.control}
                        color="secondary"
                        variant="contained"
                        disabled={props.isSaving}
                        onClick={_postEditProductSaveAction}
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state: AppState) {
    const {isSaving} = state.pagePostEdit.editPostPartProduct;

    return {
        isSaving,
    };
}

const mapDispatchToProps = {
    postEditProductCancelAction,
    postEditProductSaveAction,
};

const ConnectedPostEditPartAddProduct = connect(mapStateToProps, mapDispatchToProps)(PostEditPartAddProduct);

export default ConnectedPostEditPartAddProduct;
