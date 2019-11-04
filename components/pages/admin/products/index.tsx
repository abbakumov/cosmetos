import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from '@material-ui/core/Toolbar';

import AdminLayout from '../../../layouts/AdminLayout';

import {ProductId} from '../../../../entities/ProductBase/types';
import {AppState} from '../../../../store';

import AdminProductsTable from './components/AdminProductsTable';

const styles = require('./styles.styl');

export interface AdminProductsPagePublicProps {
    productIds: ProductId[];
};

interface AdminProductsPageProps {
}

const AdminProductsPage: FunctionComponent<{}> = () =>{
    return (
        <AdminLayout>
            <Paper>
                <Toolbar>
                    <TextField
                        label="Поиск"
                        margin="dense"
                        onChange={() => {}}
                    />
                </Toolbar>
                <AdminProductsTable />
                <TablePagination
                    component="div"
                    page={0}
                    rowsPerPage={25}
                    count={112}
                    onChangePage={() => {console.log('change!')}}
                />
            </Paper>
        </AdminLayout>
    )
}

function mapStateToProps(state: AppState, ownProps: AdminProductsPagePublicProps) {
    const {productIds} = ownProps;

    return {
    };
}

const ConnectedAdminProductsPage = connect(mapStateToProps)(AdminProductsPage);

export default ConnectedAdminProductsPage;
