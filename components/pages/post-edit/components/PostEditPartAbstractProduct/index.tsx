import React, {FC} from 'react';
import {connect} from 'react-redux';

import {PostPartProductId, PostPartProduct} from '../../../../../entities/PostPartProduct/types';
import {AppState} from '../../../../../store';

import PostEditPartAsProductContainer from '../PostEditPartAsProductContainer';
import PostEditPartUnProductContainer from '../PostEditPartUnProductContainer';

export interface PostEditPartAbstractProductProps {
    id: PostPartProductId
}

type Props = PostPartProduct;

const PostEditPartAbstractProduct: FC<PostEditPartAbstractProductProps> = (props: Props) => {
    if (props.unProductId) {
        return (
            <PostEditPartUnProductContainer
                postPartProductId={props.id}
                unProductId={props.unProductId}
            />
        );
    }

    return (
        <PostEditPartAsProductContainer
            postPartProductId={props.id}
            productId={props.productId}
            productColorId={props.productColorId}
        />
    );
}

const mapStateToProps = (state: AppState, {id}: PostEditPartAbstractProductProps): Props =>
    state.postPartProduct.items[id];

const ConnectedPostEditPartAbstractProduct = connect(
    mapStateToProps,
)(PostEditPartAbstractProduct);

export default ConnectedPostEditPartAbstractProduct;
