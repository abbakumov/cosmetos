import React, {Component} from 'react';
import {connect} from 'react-redux';

import {BlogLogin} from '../../../entities/Blog/types';
import {BlogExtra} from '../../../entities/BlogExtra/types';

import PostsList from '../../widgets/PostsList';
import ViewSensor from '../../widgets/ViewSensor';
import MobileLayout from '../../layouts/MobileLayout';
import {AppState} from '../../../store';
import {PostId} from '../../../entities/Post/types';

import BlogHead from './components/BlogHead';
import BlogHeadEdit from './components/BlogHeadEdit';
import {pageBlogFetchMoreAction} from './state/actions';

export interface BlogPageProps {
};

interface MappedProps {
    login: BlogLogin
    postIds: PostId[]
    isViewSensorActive: boolean
    isFetchingMore: boolean
    isEdit: boolean
}

interface ActionProps {
    fetchMoreAction(): void
}

interface Props extends MappedProps, ActionProps {}

class BlogPage extends Component<Props> {
    render() {
        const {login, postIds, isViewSensorActive, isFetchingMore, isEdit, fetchMoreAction} = this.props;

        return (
            <MobileLayout>
                {isEdit ? (
                    <BlogHeadEdit />
                ) : (
                    <BlogHead login={login} />
                )}
                <PostsList
                    title="Последние посты"
                    postIds={postIds}
                    namesVisible={false}
                    colorsVisible={false}
                />
                <ViewSensor
                    isFetching={isFetchingMore}
                    onViewed={fetchMoreAction}
                    isActive={isViewSensorActive}
                />
            </MobileLayout>
        )
    }
}

function mapStateToProps(state: AppState): MappedProps {
    const {blogLogin, isFetchingMore, edit} = state.pageBlog;
    const blogExtraData: BlogExtra = state.blogExtra.items[blogLogin];

    const {postIds, postsTotal} = blogExtraData;
    const isViewSensorActive = postIds.length < postsTotal;

    return {
        login: blogLogin,
        postIds,
        isViewSensorActive,
        isFetchingMore,
        isEdit: edit.isActive,
    };
}

const actionProps = {
    fetchMoreAction: pageBlogFetchMoreAction,
};

const ConnectedBlogPage = connect(mapStateToProps, actionProps)(BlogPage);

export default ConnectedBlogPage;