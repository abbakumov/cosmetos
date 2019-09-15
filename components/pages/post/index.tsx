import React, {Component} from 'react';

import {PostId} from '../../../entities/PostBase/types';
import MobileLayout from '../../layouts/MobileLayout';

import PostPicture from './components/PostPicture';
import PostBar from './components/PostBar';
import PostInfo from './components/PostInfo';
import PostProducts from './components/PostProducts';

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
                <PostInfo id={id} />
                <PostProducts id={id} />
            </MobileLayout>
        )
    }
}

export default BlogPage;