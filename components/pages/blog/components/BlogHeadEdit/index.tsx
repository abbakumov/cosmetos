import React, {FC} from 'react';
import {connect} from 'react-redux';
import {BlogLogin, Blog} from '../../../../../entities/Blog/types';
import {BlogExtra} from '../../../../../entities/BlogExtra/types';
import {AppState} from '../../../../../store';
import ActionButton from '../../../../widgets/ActionButton';
import DoubleActionButton from '../../../../widgets/DoubleActionButton';

const styles = require('./styles.styl');

export interface BlogHeadEditProps {
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

}

interface Props extends MappedProps, ActionProps {}

const BlogHead: FC<Props> = (props: Props) => {
    const {name, login, instagramLogin, imageUrl, bio, isPostOwner} = this.props;

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
                </div>
            </div>
            <div className={styles.subContainer}>
                <div className={styles.subContainerItem}>
                    {/* edit description */}
                </div>
                <div className={styles.subContainerItem}>
                    <DoubleActionButton
                        leftText="Отменить"
                        rightText="Сохранить"
                    />
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state: AppState, ownProps: BlogHeadEditProps): MappedProps {
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

const ConnectedBlogHead = connect(mapStateToProps)(BlogHead);

export default ConnectedBlogHead;