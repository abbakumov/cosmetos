import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import {PostPart, PostPartId} from '../../../../../entities/PostPart/types';
import {AppState} from '../../../../../store';

import PostEditPartProduct from '../PostEditPartProduct';

const styles = require('./styles.styl');

interface PostEditPartProps {
    id: PostPartId;
}

interface Props extends PostPart {}

const PostEditPart: FunctionComponent<Props> = (props: Props) => (
    <Paper className={styles.root}>
        <div className={styles.controls}>
            <Button variant="contained" className={styles.control} size="small" color="secondary">
                <Icon fontSize="small">edit</Icon>
            </Button>
            <Button variant="contained" className={styles.control} size="small" color="secondary">
                <Icon fontSize="small">delete</Icon>
            </Button>
        </div>
        <Typography variant="subtitle2">
            {props.title}
        </Typography>
        <div className={styles.productsContainer}>
            <Table>
                <TableHead>
                    <TableCell>Бренд</TableCell>
                    <TableCell>Продукт</TableCell>
                    <TableCell>Цвет</TableCell>
                    <TableCell align="right">Действия</TableCell>
                </TableHead>
                <TableBody>
                    {props.productIds.map(id => <PostEditPartProduct key={id} id={id} />)}
                </TableBody>
            </Table>
        </div>
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
