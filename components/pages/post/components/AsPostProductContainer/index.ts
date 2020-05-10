
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColorId} from '../../../../../entities/ProductColor/types';

import PostProduct, {PostProductProps} from '../PostProduct';

export interface AsPostProductPublicProps {
    id: ProductId
    productColorId: ProductColorId
    partId: PostPartId
    backIndex: number
    isShown: boolean
}

function mapStateToProps(state: AppState, ownProps: AsPostProductPublicProps): PostProductProps {
    const {id, productColorId, partId, backIndex, isShown} = ownProps;

    const product = state.productBase.items[id];
    const {brand, title, smallPicUrl} = product;

    const postAuthorLogin = state.postBase.items[state.pagePost.postId].authorLogin;
    const blogProductItems = state.blogProduct.items;
    const blogProductItem = Object.values(blogProductItems)
        .find(item => (item.productId === id && item.blogLogin === postAuthorLogin));
    let review, reviewAuthorImageUrl;
    if (blogProductItem) {
        review = blogProductItem.review;
        reviewAuthorImageUrl = state.blog.items[blogProductItem.blogLogin].imageUrl;
    }

    const postPart = state.postPart.items[partId];
    const {color} = postPart;
    const {postId} = state.pagePost;

    const productColor = state.productColor.items[productColorId];
    const {
        title: colorTitle,
        picUrl: colorPicUrl,
    } = productColor || {};

    return {
        id,
        brand,
        title,
        smallPicUrl,
        review,
        reviewAuthorImageUrl,
        color,
        backIndex,
        isShown,
        postId,
        colorPicUrl,
        colorTitle,
        isUnassigned: false,
    };
}

const AsPostProductContainer = connect(mapStateToProps)(PostProduct);

export default AsPostProductContainer;
