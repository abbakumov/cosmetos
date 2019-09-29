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
