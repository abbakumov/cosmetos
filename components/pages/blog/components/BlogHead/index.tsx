import React, {FC, useCallback} from 'react';
import {connect} from 'react-redux';
import {BlogLogin, Blog} from '../../../../../entities/Blog/types';
import {BlogExtra} from '../../../../../entities/BlogExtra/types';
import {AppState} from '../../../../../store';
import ActionButton from '../../../../widgets/ActionButton';

import {pageBlogEditAction} from '../../state/actions';

const styles = require('./styles.styl');

export interface BlogHeadProps {
    login: BlogLogin
}

interface MappedProps {
    name: string
    login: string
    instagramLogin: string
    imageUrl: string
    bio: string
    isPostOwner: boolean
}

interface ActionProps {
    editProfileAction(): void
}

interface Props extends MappedProps, ActionProps {}

const BlogHead: FC<Props> = (props: Props) => {
    const {name, login, instagramLogin, imageUrl, bio, isPostOwner} = props;

    const editProfileAction = useCallback(() => props.editProfileAction(), []);

    return (
        <div className={styles.root}>
            <div className={styles.mainContainer}>
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
            <div className={styles.subContainer}>
                <div className={styles.subContainerItem}>
                    <p className={styles.blogBio}>{bio}</p>
                </div>
                {isPostOwner && (
                    <div className={styles.subContainerItem}>
                        <ActionButton
                            onClick={editProfileAction}
                            text="Редактировать профиль"
                        />
                    </div>
                )}
                {isPostOwner && (
                    <div className={styles.subContainerItem}>
                        <ActionButton
                            href="/post/new"
                            text="Создать новый пост"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function mapStateToProps(state: AppState, ownProps: BlogHeadProps): MappedProps {
    const blogData: Blog = state.blog.items[ownProps.login];
    const blogExtraData: BlogExtra = state.blogExtra.items[ownProps.login];

    const {blogLogin} = state.pageBlog;
    const {currentLogin} = state.blog;

    const isPostOwner = blogLogin === currentLogin;

    return {
        name: blogData.name,
        login: blogData.login,
        instagramLogin: blogExtraData.instagramLogin,
        imageUrl: blogData.imageUrl,
        bio: blogExtraData.bio,
        isPostOwner,
    };
}

const actionProps = {
    editProfileAction: pageBlogEditAction,
};

const ConnectedBlogHead = connect(mapStateToProps, actionProps)(BlogHead);

export default ConnectedBlogHead;