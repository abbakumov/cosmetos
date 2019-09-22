import React, {Component} from 'react';
import _ from 'lodash';

import {getBlogByName} from '../../entities/Blog';
import {blogDataFetchedAction} from '../../entities/Blog/actions';
import BlogPage, {BlogPagePublicProps} from '../../components/pages/blog';
import {ICosPageContext} from '../../types/context';
import {postsBaseDataFetchedAction} from '../../entities/PostBase/actions';

interface InitialProps extends BlogPagePublicProps {
    title: string;
}

class BlogPageWrapper extends Component<InitialProps> {
    static async getInitialProps(ctx: ICosPageContext): Promise<InitialProps> {
        const {query, store} = ctx;

        // TODO: validate server data
        const blogData = await getBlogByName(_.castArray(query.name));

        store.dispatch(blogDataFetchedAction(blogData.blog));
        store.dispatch(postsBaseDataFetchedAction(blogData.postsBase));

        const login = blogData.blog.login;

        let title = 'Cosmetos';

        const bloggerName = blogData.blog && blogData.blog.name;
        if (typeof bloggerName !== 'undefined') {
            title = `${bloggerName} – Cosmetos`;
        }

        return {
            login,
            title,
        };
    }

    render() {
        return (<BlogPage {...this.props}/>);
    }
}

export default BlogPageWrapper;
