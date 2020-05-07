import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColorId} from '../../../../../entities/ProductColor/types';
import {PostPartProductId} from '../../../../../entities/PostPartProduct/types';
import {postEditProductRemoveAction} from '../../store/actions';

import PostEditPartProduct, {
    DataProps as PostEditPartProductDataProps,
    ActionProps as PostEditPartProductActionProps,
} from '../PostEditPartProduct';

export interface PublicProps {
    postPartProductId: PostPartProductId
    productId: ProductId
    productColorId: ProductColorId
}

function mapStateToProps(state: AppState, ownProps: PublicProps): PostEditPartProductDataProps {
    const product = state.productBase.items[ownProps.productId];
    const {brand, title} = product;

    const color = state.productColor.items[ownProps.productColorId];

    return {
        id: ownProps.postPartProductId,
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