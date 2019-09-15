import React, {Component} from 'react';

import {PostId} from '../../../entities/PostBase/types';
import MobileLayout from '../../layouts/MobileLayout';

import PostPicture from './components/PostPicture';
import PostBar from './components/PostBar';

export interface PostPagePublicProps {
    id: PostId,
};

class BlogPage extends Component<PostPagePublicProps> {
    render() {
        const {id} = this.props;

        return (
            <MobileLayout>
                <PostPicture id={id} />
                <PostBar id={id} />
                {/* <PostInfo />
                <PostProducts /> */}
            </MobileLayout>
        )
    }
}

export default BlogPage;