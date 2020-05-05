import React, {FC} from 'react';
import {connect} from 'react-redux';

import PostsList from '../../../../widgets/PostsList';
import ViewSensor from '../../../../widgets/ViewSensor';
import {PostId} from '../../../../../entities/Post/types';
import {AppState} from '../../../../../store';
import {pageMainFetchMorePostsAction} from '../../state/actions';

interface MappedProps {
    postIds: PostId[]
    isFetchingMore: boolean
    isViewSensorActive: boolean
}

interface ActionProps {
    fetchMoreAction(): void
}

interface Props extends MappedProps, ActionProps {}

const MainPagePosts: FC<Props> = (props: Props) => (
    <div>
        <PostsList
            title="Последние посты"
            postIds={props.postIds}
            namesVisible={true}
            colorsVisible={false}
        />
        <ViewSensor
            isFetching={props.isFetchingMore}
            onViewed={props.fetchMoreAction}
            isActive={props.isViewSensorActive}
        />
    </div>
);

const mapStateToProps = (state: AppState): MappedProps => {
    const {
        postIds,
        isFetchingMorePosts: isFetchingMore,
        isFetchingMorePostsAvailable: isViewSensorActive,
    } = state.pageMain;

    return {postIds, isFetchingMore, isViewSensorActive};
};

const actionProps = {
    fetchMoreAction: () => pageMainFetchMorePostsAction(),
};

const ConnectedMainPagePosts = connect(
    mapStateToProps,
    actionProps,
)(MainPagePosts);

export default ConnectedMainPagePosts;
