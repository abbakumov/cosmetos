import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import AdminLayout from '../../../layouts/AdminLayout';

import {AppState} from '../../../../store';

import AdminBrandsTable from './components/AdminBrandsTable';
import AdminBrandDialog from './components/AdminBrandDialog';

const styles = require('./styles.styl');

export interface AdminBrandsPagePublicProps {
};

interface AdminBrandsPageProps {
};

const AdminBrandsPage: FunctionComponent<{}> = () =>{
    return (
        <AdminLayout>
            <Paper>
                <Toolbar className={styles.toolbar}>
                    <Button
                        variant="contained"
                        size="small"
                    >
                        <Icon
                            fontSize="small"
                            className={styles.addIcon}
                        >
                            add
                        </Icon>
                        Добавить бренд
                    </Button>
                </Toolbar>
                <AdminBrandsTable />
            </Paper>
            <AdminBrandDialog />
        </AdminLayout>
    );
}

function mapStateToProps(state: AppState, ownProps: AdminBrandsPagePublicProps) {

    return {
    };
}

const ConnectedAdminBrandsPage = connect(mapStateToProps)(AdminBrandsPage);

export default ConnectedAdminBrandsPage;
