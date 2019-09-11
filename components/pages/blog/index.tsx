import React, {Component} from 'react';

import {BlogLogin, Blog} from '../../../entities/Blog/types';

import BlogHead from './components/BlogHead';
import BlogList from './components/BlogList';
import MobileLayout from '../../layouts/MobileLayout';

export interface BlogPagePublicProps {
    login: BlogLogin,
};

class BlogPage extends Component<BlogPagePublicProps> {
    render() {
        const {login} = this.props;

        return (
            <MobileLayout>
                <BlogHead login={login} />
                <BlogList />
            </MobileLayout>
        )
    }
}

export default BlogPage;