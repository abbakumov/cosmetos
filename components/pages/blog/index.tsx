import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Blog, BlogLogin} from '../../../entities/Blog/types';

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
    const blogData: Blog = state.blog.items[ownProps.login];

    const {postIds} = blogData;

    return {
        postIds,
    };
}

const ConnectedBlogPage = connect(mapStateToProps)(BlogPage);

export default ConnectedBlogPage;