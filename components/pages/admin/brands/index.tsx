import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import AdminLayout from '../../../layouts/AdminLayout';

import {AppState} from '../../../../store';

import {pageAdminBrandsNewAction} from './store/actions';

import AdminBrandsTable from './components/AdminBrandsTable';
import AdminBrandDialog from './components/AdminBrandDialog';

const styles = require('./styles.styl');

export interface AdminBrandsPagePublicProps {
};

interface AdminBrandsPageProps {};

interface MappedProps {}

interface ActionProps {
    newAction(): void;
}

interface Props extends MappedProps, ActionProps {}

const AdminBrandsPage: FunctionComponent<Props> = (props: Props) =>{
    return (
        <AdminLayout>
            <Paper>
                <Toolbar className={styles.toolbar}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => props.newAction()}
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

function mapStateToProps(state: AppState, ownProps: AdminBrandsPagePublicProps): MappedProps {
    return {};
}

const actionProps = {
    newAction: pageAdminBrandsNewAction,
};

const ConnectedAdminBrandsPage = connect(mapStateToProps, actionProps)(AdminBrandsPage);

export default ConnectedAdminBrandsPage;
