import React from 'react';
import {Provider} from 'react-redux';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import withGA from 'next-ga';

import {makeStore} from '../store';

class CosmetosApp extends App {
    static async getInitialProps({Component, ctx}) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return {pageProps};
    }

    render() {
        const {Component, pageProps, store} = this.props;

        return (
            <Provider store={store}>
                <Head>
                    <title>{pageProps.title || 'Cosmetos'}</title>
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
                    <link rel="manifest" href="/static/site.webmanifest" />
                    <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#f5b8a9" />
                    <meta name="msapplication-TileColor" content="#f5b8a9" />
                    <meta name="theme-color" content="#f5b8a9" />
                </Head>
                <Component {...pageProps}/>
            </Provider>
        );
    }
}

export default withGA('UA-111535910-2', Router)(withRedux(makeStore)(CosmetosApp));
