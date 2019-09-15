import React, {Component} from 'react';

import {PostId} from '../../../entities/PostBase/types';
import MobileLayout from '../../layouts/MobileLayout';

import PostPicture from './components/PostPicture';

export interface PostPagePublicProps {
    id: PostId,
};

class BlogPage extends Component<PostPagePublicProps> {
    render() {
        const {id} = this.props;

        return (
            <MobileLayout>
                <PostPicture id={id}/>
                {/*<PostBar />
                <PostInfo />
                <PostProducts /> */}
            </MobileLayout>
        )
    }
}

export default BlogPage;