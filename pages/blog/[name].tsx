import React, {Component} from 'react';
import _ from 'lodash';

import {getBlogByName} from '../../entities/Blog';
import {blogDataFetchedAction} from '../../entities/Blog/actions';
import BlogPage from '../../components/pages/blog';
import {ICosPageContext} from '../../types/context';

class BlogPageWrapper extends Component {
    static async getInitialProps(ctx: ICosPageContext) {
        const {query, store} = ctx;

        const blogData = await getBlogByName(_.castArray(query.name));

        // TODO: validate server data

        store.dispatch(blogDataFetchedAction(blogData));

        // TODO: коннекты, диспатчи и так далее в компоненте страницы

        return;
    }

    render() {
        return (<BlogPage {...this.props}/>);
    }
}

export default BlogPageWrapper;
