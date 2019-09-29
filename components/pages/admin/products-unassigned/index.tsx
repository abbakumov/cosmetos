import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';

import AdminLayout from '../../../layouts/AdminLayout';

import {ProductId} from '../../../../entities/ProductBase/types';
import {AppState} from '../../../../store';

const styles = require('./styles.styl');

export interface AdminProductsUnassignedPageProps {
    productIds: ProductId[];
};

interface Props {

}

const AdminProductsUnassignedPage: FunctionComponent<{}> = () =>{
    return (
        <AdminLayout>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Бренд</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Пост</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>Nyx Cosmetos</TableCell>
                            <TableCell>Помада шмада</TableCell>
                            <TableCell>
                                Elizabeth Ioda / Что-то там например
                                <Button
                                    className={styles.openPostButton}
                                    variant="contained"
                                    size="small"
                                >
                                    <Icon
                                        fontSize="small"
                                        className={styles.openIcon}
                                    >
                                        open_in_new
                                    </Icon>
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="contained"
                                    size="small"
                                >
                                    <Icon
                                        fontSize="small"
                                        className={styles.openIcon}
                                    >
                                        add
                                    </Icon>
                                    Привязать
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            <Dialog open={false} onClose={() => console.log('on close')}>
                <DialogTitle>Выбор соответствующего продукта</DialogTitle>
                <DialogContent dividers>
                    <div className={styles.unassignedProductInfo}>
                        <div className={styles.line}>
                            <span className={styles.lineLabel}>Блог: </span>
                            <span>Лиза Иода</span>
                        </div>
                        <div className={styles.line}>
                            <span className={styles.lineLabel}>Бренд: </span>
                            <span>Nyx Shmiks</span>
                        </div>
                        <div className={styles.line}>
                            <span className={styles.lineLabel}>Название: </span>
                            <span>Какой-то там праймер или хз че</span>
                        </div>
                        <div className={styles.line}>
                            <span className={styles.lineLabel}>Цвет: </span>
                            <span>Красненький такой</span>
                        </div>
                    </div>
                    <TextField
                        className={styles.productIdField}
                        label="ID продукта"
                        variant="outlined"
                    />
                    <div>
                        <div className={styles.circular}>
                            <CircularProgress className={styles.circular} />
                        </div>
                        <div className={styles.productInfo}>
                            <div className={styles.line}>
                                <span className={styles.lineLabel}>Бренд: </span>
                                <span>Nyx Shmiks</span>
                            </div>
                            <div className={styles.line}>
                                <span className={styles.lineLabel}>Название: </span>
                                <span>Какой-то там праймер или хз че</span>
                            </div>
                        </div>
                        <Select
                            className={styles.colorSelect}
                            value="blue"
                            inputProps={{
                                name: 'brand',
                            }}
                            variant="outlined"
                        >
                            <MenuItem value="blue">Голубой</MenuItem>
                            <MenuItem value="red">Красный</MenuItem>
                        </Select>                        
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button color="primary">Выбрать</Button>
                </DialogActions>
            </Dialog>
        </AdminLayout>
    )
}

function mapStateToProps(state: AppState, ownProps: AdminProductsUnassignedPageProps) {
    const {productIds} = ownProps;

    return {
    };
}

const ConnectedAdminProductsUnassignedPage = connect(mapStateToProps)(AdminProductsUnassignedPage);

export default ConnectedAdminProductsUnassignedPage;
