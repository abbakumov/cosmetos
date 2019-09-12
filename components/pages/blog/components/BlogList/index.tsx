import React, {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import {BlogLogin, Blog} from '../../../../../entities/Blog/types';
import {StoreState} from '../../../../../store/types';

import BlogListPost from './Post';

const styles = require('./styles.styl');

interface BlogListPublicProps {
    login: BlogLogin;
}

interface BlogListProps {
    postIds: number[];
}

class BlogList extends Component<BlogListProps> {
    render() {
        const {postIds} = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.title}>Последние фотографии</div>
                <div className={styles.container}>
                    {postIds.map(id => (<BlogListPost key={id} id={id} />))}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: StoreState, ownProps: BlogListPublicProps): BlogListProps {
    const blogData: Blog = state.blog.items[ownProps.login];

    return {
        postIds: blogData.postIds
    };
}

const ConnectedBlogList = connect(mapStateToProps)(BlogList);

export default ConnectedBlogList;