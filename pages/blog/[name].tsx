import React, {Component} from 'react';
import _ from 'lodash';

import {getBlogByName} from '../../entities/Blog';
import {blogDataFetchedAction} from '../../entities/Blog/actions';
import BlogPage, {BlogPagePublicProps} from '../../components/pages/blog';
import {ICosPageContext} from '../../types/context';
import {postsBaseDataFetchedAction} from '../../entities/PostBase/actions';

class BlogPageWrapper extends Component<BlogPagePublicProps> {
    static async getInitialProps(ctx: ICosPageContext): Promise<BlogPagePublicProps> {
        const {query, store} = ctx;

        // TODO: validate server data
        const blogData = await getBlogByName(_.castArray(query.name));

        store.dispatch(blogDataFetchedAction(blogData.blog));
        store.dispatch(postsBaseDataFetchedAction(blogData.postsBase));

        const login = blogData.blog.login;

        return {
            login,
        };
    }

    render() {
        return (<BlogPage {...this.props}/>);
    }
}

export default BlogPageWrapper;
