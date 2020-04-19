import React, {Component} from 'react';
import {connect} from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';

import {AppState} from '../../../store';
import {BlogLogin} from '../../../entities/Blog/types';
import NotificationMaterial from '../../widgets/NotificationMaterial';

const styles = require('./styles.styl');

interface Props {
    currentUserLogin?: BlogLogin
    currentUserImageUrl?: string
}

class MobileLayout extends Component<Props> {
    render() {
        const {currentUserLogin, currentUserImageUrl} = this.props;

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
                    {currentUserLogin &&
                        <Link
                            href="/blog/[login]"
                            as={`/blog/${currentUserLogin}`}
                        >
                            <a className={styles.profileLink}>
                                <img
                                    className={styles.profileLinkPic}
                                    src={currentUserImageUrl}
                                />
                            </a>
                        </Link>
                    }
                </div>
                <div className={styles.content}>
                    {this.props.children}
                </div>
                <NotificationMaterial />
            </div>
        );
    }
}

function mapStateToProps(state: AppState): Props {
    const {currentLogin, items} = state.blog;
    const user = items[currentLogin];

    if (!user) {
        return {
            currentUserLogin: null,
            currentUserImageUrl: null,
        };
    }

    return {
        currentUserLogin: user.login,
        currentUserImageUrl: user.imageUrl,
    };
}

const ConnectedMobileLayout = connect(mapStateToProps)(MobileLayout);

export default ConnectedMobileLayout;
