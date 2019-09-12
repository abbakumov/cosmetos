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
        const {} = this.props;

        return (
            <div>
            </div>
        )
    }
}

function mapStateToProps(state: StoreState, ownProps: BlogListPostPublicProps): BlogListPostProps {
    const postData: PostBase = state.postBase.items[ownProps.id];

    return postData;
}

const ConnectedBlogListPost = connect(mapStateToProps)(BlogListPost);

export default ConnectedBlogListPost;
