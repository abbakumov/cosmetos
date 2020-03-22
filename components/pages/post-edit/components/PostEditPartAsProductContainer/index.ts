import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {postEditProductRemoveAction} from '../../store/actions';

import PostEditPartProduct, {
    DataProps as PostEditPartProductDataProps,
    ActionProps as PostEditPartProductActionProps,
} from '../PostEditPartProduct';

export interface PublicProps {
    id: ProductId
}

function mapStateToProps(state: AppState, ownProps: PublicProps): PostEditPartProductDataProps {
    const product = state.productBase.items[ownProps.id];
    const {brand, title} = product;

    const ppItems = state.postProduct.items;
    const postProduct = Object.values(ppItems).find(_postProduct => (
        // post product postId is current post id?
        _postProduct.postId === state.pagePostEdit.postEdit.id
        // post product productId is current product id?
        && _postProduct.productId === ownProps.id
    ));

    const color = state.productColor.items[postProduct.productColorId];

    return {
        id: postProduct.id,
        brand,
        product: title,
        color: color ? color.title : null,
        isUnassigned: false,
    };
}

const actionProps = {
    productRemoveAction: postEditProductRemoveAction,
};

const PostEditPartAsProductContainer = connect<
        PostEditPartProductDataProps,
        PostEditPartProductActionProps,
        PublicProps
    >(mapStateToProps, actionProps)(PostEditPartProduct);

export default PostEditPartAsProductContainer;