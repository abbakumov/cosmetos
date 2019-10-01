import React, {FunctionComponent} from 'react';

import Paper from '@material-ui/core/Paper';

import AdminLayout from '../../../layouts/AdminLayout';

import UnProductsTable from './components/UnProductsTable';
import UnProductsModal from './components/UnProductsModal';

const styles = require('./styles.styl');

const AdminProductsUnassignedPage: FunctionComponent = () =>{
    return (
        <AdminLayout>
            <Paper>
                <UnProductsTable />
            </Paper>
            <UnProductsModal />
        </AdminLayout>
    )
}

export default AdminProductsUnassignedPage;
