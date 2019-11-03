import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';

import AdminLayout from '../../../layouts/AdminLayout';

import {AppState} from '../../../../store';

export interface AdminBrandsPagePublicProps {
};

interface AdminBrandsPageProps {
}

const AdminBrandsPage: FunctionComponent<{}> = () =>{
    return (
        <AdminLayout>
            <Paper>
                <Toolbar>
                </Toolbar>
            </Paper>
        </AdminLayout>
    )
}

function mapStateToProps(state: AppState, ownProps: AdminBrandsPagePublicProps) {

    return {
    };
}

const ConnectedAdminBrandsPage = connect(mapStateToProps)(AdminBrandsPage);

export default ConnectedAdminBrandsPage;
