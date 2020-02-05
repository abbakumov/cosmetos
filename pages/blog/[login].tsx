import React, {Component} from 'react';
import _ from 'lodash';

import {getBlogByName} from '../../entities/Blog/api';
import {blogsDataFetchedAction} from '../../entities/Blog/actions';
import {blogExtraDataFetchedAction} from '../../entities/BlogExtra/actions';
import BlogPage, {BlogPageProps} from '../../components/pages/blog';
import {pageBlogFetchSuccessAction} from '../../components/pages/blog/state/actions';
import {ICosPageContext} from '../../types/context';
import {postsBaseDataFetchedAction} from '../../entities/Post/actions';

interface InitialProps extends BlogPageProps {
    title: string;
}

class BlogPageWrapper extends Component<InitialProps> {
    static async getInitialProps(ctx: ICosPageContext): Promise<InitialProps> {
        const {query, store} = ctx;
        const login = _.castArray(query.login)[0];

        // TODO: validate server data
        const {blog, blogExtra, postsBase} = await getBlogByName(login, 0, ctx);

        store.dispatch(pageBlogFetchSuccessAction(login));
        store.dispatch(blogsDataFetchedAction(blog.data, blog.currentLogin));
        store.dispatch(blogExtraDataFetchedAction(blogExtra));
        store.dispatch(postsBaseDataFetchedAction(postsBase));

        let title = 'Cosmetos';

        const bloggerName = blog.data[login].name;
        if (typeof bloggerName !== 'undefined') {
            title = `${bloggerName} – Cosmetos`;
        }

        return {
            title,
        };
    }

    render() {
        return (<BlogPage {...this.props}/>);
    }
}

export default BlogPageWrapper;
