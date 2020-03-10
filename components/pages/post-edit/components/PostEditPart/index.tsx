import {FunctionComponent, useCallback} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import {
    postEditStartAddProductAction,
    postEditPartEditAction,
    postEditPartRemoveAction,
} from '../../store/actions';
import {PostPart, PostPartId} from '../../../../../entities/PostPart/types';
import {AppState} from '../../../../../store';

import PostEditPartAbstractProduct from '../PostEditPartAbstractProduct';
import PostEditPartAddProduct from '../PostEditPartAddProduct';

const styles = require('./styles.styl');

interface PostEditPartProps {
    id: PostPartId;
}

interface MappedProps extends PostPart {
    isActiveAddProduct: boolean;
}

interface ActionProps {
    postEditStartAddProductAction(id: PostPartId): void;
    postEditPartEditAction(id: PostPartId): void;
    postEditPartRemoveAction(id: PostPartId): void;
}

interface Props extends MappedProps, ActionProps {}

const PostEditPart: FunctionComponent<Props> = (props: Props) => {
    const _postEditPartEditAction = useCallback(() => props.postEditPartEditAction(props.id), [props.id]);
    const _postEditPartRemoveAction = useCallback(() => props.postEditPartRemoveAction(props.id), [props.id]);
    const _postEditStartAddProductAction = useCallback(() => props.postEditStartAddProductAction(props.id), [props.id]);

    return (
        <Paper className={styles.root}>
            <div className={styles.controls}>
                <Button
                    variant="contained"
                    className={styles.control}
                    size="small"
                    color="secondary"
                    onClick={_postEditPartEditAction}
                >
                    <Icon fontSize="small">edit</Icon>
                </Button>
                <Button
                    variant="contained"
                    className={styles.control}
                    size="small"
                    color="secondary"
                    onClick={_postEditPartRemoveAction}
                >
                    <Icon fontSize="small">delete</Icon>
                </Button>
            </div>
            <Typography variant="subtitle2">
                {props.title}
            </Typography>
            <div className={styles.productsContainer}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Бренд</TableCell>
                            <TableCell>Продукт</TableCell>
                            <TableCell>Цвет</TableCell>
                            <TableCell align="right">Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.productIds.map(id => <PostEditPartAbstractProduct key={id} id={id} />)}
                    </TableBody>
                </Table>
            </div>
            {props.isActiveAddProduct && <PostEditPartAddProduct />}
            {!props.isActiveAddProduct &&
                <div className={styles.bottomControls}>
                    <Button onClick={_postEditStartAddProductAction}>
                        Добавить продукт
                    </Button>
                </div>
            }
        </Paper>
    );
};

function mapStateToProps(state: AppState, ownProps: PostEditPartProps): MappedProps {
    const postPart = state.postPart.items[ownProps.id];

    const isActiveAddProduct = state.pagePostEdit.editPostPartProduct.postPartId === ownProps.id;

    return {
        ...postPart,
        isActiveAddProduct,
    };
}

const mapDispatchToProps: ActionProps = {
    postEditStartAddProductAction,
    postEditPartEditAction,
    postEditPartRemoveAction,
};

const ConnectedPostEditPart = connect(mapStateToProps, mapDispatchToProps)(PostEditPart);

export default ConnectedPostEditPart;
