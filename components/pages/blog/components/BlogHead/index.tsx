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
    instagramLogin: string,
    imageUrl: string,
}

class BlogHead extends Component<BlogHeadProps> {
    render() {
        const {name, instagramLogin, imageUrl} = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.left}>
                    <img
                        className={styles.image}
                        src={imageUrl}
                        alt={`фото ${name}`}
                    />
                </div>
                <div className={styles.right}>
                    <a
                        className={styles.instaIcon}
                        target="_blank"
                        href={`https://www.instagram.com/${instagramLogin}/`}
                    >
                        <img
                            src="/static/icons/blog-page/insta.svg"
                            alt="иконка Istagram"
                        />
                    </a>
                </div>
                <div className={styles.center}>
                    <h1 className={styles.name}>{name}</h1>
                    <div className={styles.instaLogin}>@{instagramLogin}</div>
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
        instagramLogin: blogExtraData.instagramLogin,
        imageUrl: blogData.imageUrl,
    };
}

const ConnectedBlogHead = connect(mapStateToProps)(BlogHead);

export default ConnectedBlogHead;