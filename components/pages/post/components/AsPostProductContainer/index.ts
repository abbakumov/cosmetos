
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostPartProduct} from '../../../../../entities/PostPartProduct/types';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

import PostProduct, {PostProductProps} from '../PostProduct';

export interface AsPostProductPublicProps {
    id: ProductId
    partId: PostPartId
    backIndex: number
    isShown: boolean
}

function mapStateToProps(state: AppState, ownProps: AsPostProductPublicProps): PostProductProps {
    const {id, partId, backIndex, isShown} = ownProps;

    const product = state.productBase.items[id];
    const {brand, title, smallPicUrl} = product;

    const blogProductItems = state.blogProduct.items;
    const blogProductItem = Object.values(blogProductItems).find(item => item.productId === id);
    let review, reviewAuthorImageUrl;
    if (blogProductItem) {
        review = blogProductItem.review;
        reviewAuthorImageUrl = state.blog.items[blogProductItem.blogLogin].imageUrl;
    }

    const postPart = state.postPart.items[partId];
    const {color} = postPart;
    const {postId} = state.pagePost;

    const {items} = state.postPartProduct;
    const postPartProductItem: PostPartProduct = Object.values(items)
        .find((item: PostPartProduct) => item.postPartId === partId && item.productId === id);

    if (!postPartProductItem) {throw new Error('PostProduct: postPartProductItem must not be empty!')}

    const productColor = state.productColor.items[postPartProductItem.productColorId];
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
