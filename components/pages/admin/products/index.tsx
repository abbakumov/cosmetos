import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from '@material-ui/core/Toolbar';

import AdminLayout from '../../../layouts/AdminLayout';

import {ProductId} from '../../../../entities/ProductBase/types';
import {AppState} from '../../../../store';

import {
    pageAdminProductsFilterTitleChangeAction,
    pageAdminProductsRowsChangeAction,
    pageAdminProductsPreviousPageAction,
    pageAdminProductsNextPageAction,
} from './store/actions';

import AdminProductsTable from './components/AdminProductsTable';

const styles = require('./styles.styl');

export interface AdminProductsPagePublicProps {
};

interface MappedProps {
    total: number;
    pageRows: number;
    page: number;
    filterTitle: string;
}

interface ActionProps {
    filterTitleChangeAction(value: string): void;
    rowsChangeAction(value: number): void;
    previousPageAction(): void;
    nextPageAction(): void;
}

interface Props extends MappedProps, ActionProps {}

const AdminProductsPage: FunctionComponent<Props> = (props: Props) =>{
    return (
        <AdminLayout>
            <Paper>
                <Toolbar>
                    <TextField
                        label="Поиск"
                        margin="dense"
                        value={props.filterTitle}
                        onChange={e => {props.filterTitleChangeAction(e.target.value)}}
                    />
                </Toolbar>
                <AdminProductsTable />
                <TablePagination
                    component="div"
                    page={props.page}
                    rowsPerPage={props.pageRows}
                    onChangeRowsPerPage={e => {props.rowsChangeAction(parseInt(e.target.value))}}
                    count={props.total}
                    onChangePage={(e, page) => {
                        if (props.page < page) {
                            props.nextPageAction();
                        } else {
                            props.previousPageAction();
                        }
                    }}
                />
            </Paper>
        </AdminLayout>
    )
}

function mapStateToProps(state: AppState, ownProps: AdminProductsPagePublicProps) {
    const {
        total,
        pageRows,
        offset,
        filterTitle,
    } = state.pageAdminProducts;

    const page = Math.round(offset / pageRows);

    return {
        total,
        pageRows,
        page,
        filterTitle,
    };
}

const actionProps = {
    filterTitleChangeAction: pageAdminProductsFilterTitleChangeAction,
    rowsChangeAction: pageAdminProductsRowsChangeAction,
    previousPageAction: pageAdminProductsPreviousPageAction,
    nextPageAction: pageAdminProductsNextPageAction,
};

const ConnectedAdminProductsPage = connect(mapStateToProps, actionProps)(AdminProductsPage);

export default ConnectedAdminProductsPage;
