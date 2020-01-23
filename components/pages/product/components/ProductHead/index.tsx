import React, {FC} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';
import BackLink from '../../../../widgets/BackLink';

interface Props {
    postId: PostId
}

const ProductHead: FC<Props> = ({postId}: Props) => {
    if (!postId) {
        return null;
    }

    return (
        <BackLink href="/post/[id]" as={`/post/${postId}`}>
            Назад
        </BackLink>
    );
}

function mapStateToProps(state: AppState) {
    const {refPost} = state.pageProduct;
    return {postId: refPost};
}

const ConnectedProductHead = connect(mapStateToProps)(ProductHead);

export default ConnectedProductHead;
