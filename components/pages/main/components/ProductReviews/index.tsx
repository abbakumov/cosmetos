import React, {FC} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import {AppState} from '../../../../../store';
import {pageMainFetchMoreBlogProductsAction} from '../../state/actions';
import SectionTitle from '../../../../widgets/SectionTitle';
import {BlogProductId} from '../../../../../entities/BlogProduct/types';
import {ProductId} from '../../../../../entities/ProductBase/types';
import ActionButton from '../../../../widgets/ActionButton';
import Spinner from '../../../../widgets/Spinner';

const styles = require('./styles.styl');

interface ReviewItem {
    id: BlogProductId
    brand: string
    product: string
    productId: ProductId
    productPicture: string
    blogName: string
    blogLogin: string
    blogPicture: string
    review: string
}

interface MappedProps {
    reviewItems: ReviewItem[]
    isFetching: boolean
    isMoreAvailable: boolean
}

interface ActionProps {
    fetchMoreReviewsAction(): void
}

interface Props extends MappedProps, ActionProps {}

const ProductReviews: FC<Props> = (props: Props) => (
    <div className={styles.root}>
        <SectionTitle>Новые отзывы</SectionTitle>
        {props.reviewItems.map(item => (
            <div key={item.id} className={styles.review}>
                <Link href="/product/[id]" as={`/product/${item.productId}`}>
                    <a className={styles.left}>
                        <img className={styles.productImage} src={item.productPicture} />
                    </a>
                </Link>
                <div className={styles.right}>
                    <Link href="/product/[id]" as={`/product/${item.productId}`}>
                        <a className={styles.productTitle}>
                            <span className={styles.productTitleBrand}>{item.brand}</span>
                            {" "}
                            {item.product}
                        </a>
                    </Link>
                    <Link href="/blog/[login]" as={`/blog/${item.blogLogin}`}>
                        <a className={styles.blog}>
                            <img className={styles.blogImage} src={item.blogPicture} />
                            <span className={styles.blogName}>{item.blogName}</span>
                        </a>
                    </Link>
                    <div className={styles.reviewText}>
                        "{item.review}"
                    </div>
                </div>
            </div>
        ))}
        <div className={styles.more}>
            {!props.isFetching && props.isMoreAvailable && (
                <ActionButton onClick={props.fetchMoreReviewsAction} text="Еще отзывы" />
            )}
            {props.isFetching && (<Spinner />)}
        </div>
    </div>
);

const mapStateToProps = (state: AppState): MappedProps => {
    const {pageMain, blogProduct, blog, productBase} = state;
    const {blogProductIds} = pageMain;

    const reviewItems: ReviewItem[] = blogProductIds.map(id => {
        const item = blogProduct.items[id];
        const {review, blogLogin, productId} = item;
        const blogItem = blog.items[blogLogin];
        const productItem = productBase.items[productId];

        return {
            id,
            brand: productItem.brand,
            productId,
            product: productItem.title,
            productPicture: productItem.smallPicUrl,
            blogName: blogItem.name,
            blogLogin,
            blogPicture: blogItem.imageUrl,
            review,
        };
    });

    const isFetching = pageMain.isFetchingMoreBlogProducts;
    const isMoreAvailable = pageMain.isFetchingMoreBlogProductsAvailable;

    return {reviewItems, isFetching, isMoreAvailable};
};

const actionProps = {
    fetchMoreReviewsAction: () => pageMainFetchMoreBlogProductsAction(),
};

const ConnectedProductReviews = connect(
    mapStateToProps,
    actionProps,
)(ProductReviews);

export default ConnectedProductReviews;
