import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import {BlogLogin, Blog} from '../../../../../entities/Blog/types';
import {BlogExtra} from '../../../../../entities/BlogExtra/types';
import {AppState} from '../../../../../store';

const styles = require('./styles.styl');

export interface BlogHeadPublicProps {
    login: BlogLogin
}

interface BlogHeadProps {
    name: string;
    login: string;
    instagramLogin: string,
    imageUrl: string,
}

class BlogHead extends Component<BlogHeadProps> {
    render() {
        const {name, login, instagramLogin, imageUrl} = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.left}>
                    <img
                        className={styles.image}
                        src={imageUrl}
                        alt={`фото ${name}`}
                    />
                </div>
                <div className={styles.center}>
                    <h1 className={styles.name}>{name}</h1>
                    <div className={styles.login}>@{login}</div>
                    <a
                        className={styles.instaButton}
                        target="_blank"
                        href={`https://www.instagram.com/${instagramLogin}/`}
                    >
                        <img
                            src="/static/icons/blog-page/insta.svg"
                            alt="иконка Istagram"
                        />
                        <span className={styles.instaLogin}>{instagramLogin}</span>
                    </a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: AppState, ownProps: BlogHeadPublicProps): BlogHeadProps {
    const blogData: Blog = state.blog.items[ownProps.login];
    const blogExtraData: BlogExtra = state.blogExtra.items[ownProps.login];

    return {
        name: blogData.name,
        login: blogData.login,
        instagramLogin: blogExtraData.instagramLogin,
        imageUrl: blogData.imageUrl,
    };
}

const ConnectedBlogHead = connect(mapStateToProps)(BlogHead);

export default ConnectedBlogHead;