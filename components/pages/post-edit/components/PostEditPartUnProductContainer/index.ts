import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {UnProductId} from '../../../../../entities/UnProduct/types';
import {unProductRemoveAction} from '../../../../../entities/UnProduct/actions';

import PostEditPartProduct, {
    DataProps as PostEditPartProductDataProps,
    ActionProps as PostEditPartProductActionProps,
} from '../PostEditPartProduct';

export interface PublicProps {
    id: UnProductId
}

function mapStateToProps(state: AppState, ownProps: PublicProps): PostEditPartProductDataProps {
    const {id} = ownProps;
    const {
        brandId,
        brandText,
        productId,
        productText,
        productColorText,
    } = state.unProduct.items[id];

    const brand = brandId
        ? state.brand.items[brandId].titleShort
        : brandText;

    const product = productId
        ? state.productBase.items[productId].title
        : productText;

    return {
        id,
        brand,
        product,
        color: productColorText,
        isUnassigned: true,
    };
}

const actionProps = {
    productRemoveAction: unProductRemoveAction,
};

const PostEditPartUnProductContainer = connect<
        PostEditPartProductDataProps,
        PostEditPartProductActionProps,
        PublicProps
    >(mapStateToProps, actionProps)(PostEditPartProduct);

export default PostEditPartUnProductContainer;
