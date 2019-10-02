import React, {Component, FunctionComponent} from 'react';
import Head from 'next/head';

const styles = require('./styles.styl');

export interface DesktopLayoutPublicProps {}

const DesktopLayout: FunctionComponent<DesktopLayoutPublicProps> = (props) => (
    <div className={styles.root}>
        <Head>
            <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
        </Head>
        <div className={styles.content}>
            {props.children}
        </div>
    </div>
);

export default DesktopLayout;
