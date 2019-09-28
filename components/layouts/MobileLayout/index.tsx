import React, {Component} from 'react';
import Head from 'next/head';

const styles = require('./styles.styl');

export interface MobileLayoutPublicProps {}

export default class MobileLayout extends Component<MobileLayoutPublicProps> {
    render() {
        return (
            <div className={styles.root}>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                </Head>
                <div className={styles.header}>
                    <img className={styles.logo} src="/static/icons/header-logo.png"/>
                </div>
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
