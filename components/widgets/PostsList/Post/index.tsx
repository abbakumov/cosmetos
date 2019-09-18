import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import {PostId, PostBase} from '../../../../entities/PostBase/types';
import {AppState} from '../../../../store';

const styles = require('./styles.styl');

interface PostsListPostPublicProps {
    id: PostId;
    nameVisible: boolean;
}

interface PostsListPostProps extends PostBase {
    name: string;
    nameVisible: boolean;
}

class PostsListPost extends Component<PostsListPostProps> {
    render() {
        const {id, title, imageUrl, nameVisible, name} = this.props;

        return (
            <Link href="/post/[id]" as={`/post/${id}`}>
                <a className={styles.root}>
                    <img className={styles.image} src={imageUrl}/>
                    {nameVisible && <span className={styles.name}>{name}</span>}
                    <h2 className={styles.title}>{title}</h2>
                </a>
            </Link>
        )
    }
}

function mapStateToProps(state: AppState, ownProps: PostsListPostPublicProps): PostsListPostProps {
    const {id, nameVisible} = ownProps;

    const postData: PostBase = state.postBase.items[id];

    const {name} = state.blog.items[postData.authorLogin];

    return {
        ...postData,
        name,
        nameVisible,
    };
}

const ConnectedBlogListPost = connect(mapStateToProps)(PostsListPost);

export default ConnectedBlogListPost;
