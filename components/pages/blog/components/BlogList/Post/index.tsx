import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import {PostId, PostBase} from '../../../../../../entities/PostBase/types';
import {StoreState} from '../../../../../../store/types';

const styles = require('./styles.styl');

interface BlogListPostPublicProps {
    id: PostId;
}

interface BlogListPostProps extends PostBase {}

class BlogListPost extends Component<BlogListPostProps> {
    render() {
        const {id, title, imageUrl} = this.props;

        return (
            <Link href="/post/[id]" as={`/post/${id}`}>
                <a className={styles.root}>
                    <img className={styles.image} src={imageUrl}/>
                    <h2 className={styles.title}>{title}</h2>
                </a>
            </Link>
        )
    }
}

function mapStateToProps(state: StoreState, ownProps: BlogListPostPublicProps): BlogListPostProps {
    const postData: PostBase = state.postBase.items[ownProps.id];

    return postData;
}

const ConnectedBlogListPost = connect(mapStateToProps)(BlogListPost);

export default ConnectedBlogListPost;
