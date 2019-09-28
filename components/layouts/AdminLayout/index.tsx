import React, {Component, FunctionComponent} from 'react';
import Head from 'next/head';

import TopBar from './components/TobBar';
import SideMenu from './components/SideMenu';

// resets all css rules
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = require('./styles.styl');

export interface AdminLayoutPublicProps {}

const AdminLayout: FunctionComponent<AdminLayoutPublicProps> = (props) => {

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <div>
                <CssBaseline />
                <TopBar />
                <SideMenu />
                <main className={styles.content}>
                    {props.children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
