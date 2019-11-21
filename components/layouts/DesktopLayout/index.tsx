import React, {Component, FunctionComponent} from 'react';
import Head from 'next/head';

import NotificationMaterial from '../../widgets/NotificationMaterial';

const styles = require('./styles.styl');

export interface DesktopLayoutPublicProps {}

const DesktopLayout: FunctionComponent<DesktopLayoutPublicProps> = (props) => (
    <div className={styles.root}>
        <Head>
            <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Head>
        <div className={styles.content}>
            {props.children}
        </div>
        <NotificationMaterial />
    </div>
);

export default DesktopLayout;
