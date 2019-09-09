import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import _ from 'lodash';

import {getBlogByName} from '../../entities/Blog';
import BlogPage from '../../components/pages/blog';
import {ICosPageContext} from '../../types/context';

class BlogPageWrapper extends Component {
    static async getInitialProps(ctx: ICosPageContext) {
        const {query, store} = ctx;

        const blogInfo = getBlogByName(_.castArray(query.name));

        // store.dispatch({

        // });

        // TODO: экшены для сохранения данных блога
        // TODO: описать нормальные данные страницы блога
        // TODO: коннекты, диспатчи и так далее в компоненте страницы

        return blogInfo;
    }

    render() {
        return (<BlogPage {...this.props}/>);
    }
}

export default BlogPageWrapper;
