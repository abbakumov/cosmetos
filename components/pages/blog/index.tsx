import React, {Component} from 'react';
import {connect} from 'react-redux';

import {BlogLogin} from '../../../entities/Blog/types';
import {BlogExtra} from '../../../entities/BlogExtra/types';

import BlogHead from './components/BlogHead';
import PostsList from '../../widgets/PostsList';
import MobileLayout from '../../layouts/MobileLayout';
import {AppState} from '../../../store';
import {PostId} from '../../../entities/Post/types';

export interface BlogPagePublicProps {
    login: BlogLogin,
};

interface BlogPageProps {
    login: BlogLogin;
    postIds: PostId[];
}

class BlogPage extends Component<BlogPageProps> {
    render() {
        const {login, postIds} = this.props;

        return (
            <MobileLayout>
                <BlogHead login={login} />
                <PostsList
                    title="Последние посты"
                    postIds={postIds}
                    namesVisible={false}
                />
            </MobileLayout>
        )
    }
}

function mapStateToProps(state: AppState, ownProps: BlogPagePublicProps) {
    const blogExtraData: BlogExtra = state.blogExtra.items[ownProps.login];

    const {postIds} = blogExtraData;

    return {
        postIds,
    };
}

const ConnectedBlogPage = connect(mapStateToProps)(BlogPage);

export default ConnectedBlogPage;