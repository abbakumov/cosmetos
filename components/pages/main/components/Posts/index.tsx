import React, {FC} from 'react';
import {connect} from 'react-redux';

import PostsList from '../../../../widgets/PostsList';
import {PostId} from '../../../../../entities/Post/types';
import {AppState} from '../../../../../store';

interface Props {
    postIds: PostId[]
}

const MainPagePosts = (props: Props) => (
    <div>
        <PostsList
            title="Последние посты"
            postIds={props.postIds}
            namesVisible={true}
            colorsVisible={false}
        />
    </div>
);

const mapStateToProps = (state: AppState) => {
    const {postIds} = state.pageMain;

    return {postIds};
};

const ConnectedMainPagePosts = connect(
    mapStateToProps,
)(MainPagePosts);

export default ConnectedMainPagePosts;
