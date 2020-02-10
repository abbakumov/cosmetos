import {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import cn from 'classnames';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {PostId} from '../../../../../entities/Post/types';
import {PostPartProduct} from '../../../../../entities/PostPartProduct/types';

const styles = require('./styles.styl');

export interface PostProductPublicProps {
    id: ProductId;
    partId: PostPartId;
    backIndex: number;
    isShown: boolean;
}

interface PostProductProps {
    id: ProductId
    brand: string
    title: string
    smallPicUrl: string
    comment: string
    color: string
    backIndex: number
    isShown: boolean
    postId: PostId
    colorPicUrl?: string
    colorTitle?: string
}

class PostProduct extends Component<PostProductProps> {
    render() {
        const {
            id,
            brand,
            title,
            smallPicUrl,
            comment,
            color,
            backIndex,
            isShown,
            postId,
            colorTitle,
            colorPicUrl,
        } = this.props;

        const style = {
            borderColor: `#${color}`,
            zIndex: backIndex,
        };

        const rootClassName = cn(styles.root, {
            [styles.rootHidden]: !isShown,
        });

        return (
            <Link
                href={`/product/[id]?refPost=${postId}`}
                as={`/product/${id}?refPost=${postId}`}
            >
                <a className={rootClassName} style={style}>
                    <div className={styles.left}>
                        <img className={styles.img} src={smallPicUrl} />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.brand}>{brand}</div>
                        <h3 className={styles.title}>{title}</h3>
                        {colorTitle &&
                            <div className={styles.color}>
                                {colorPicUrl && <img className={styles.colorImage} src={colorPicUrl} />}
                                <span className={styles.colorText}>{colorTitle}</span>
                            </div>
                        }
                        {!!comment && <div className={styles.comment}>"{comment}"</div>}
                    </div>
                    <img className={styles.arr} src="/static/icons/post-page/product-arr.svg" />
                </a>
            </Link>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostProductPublicProps): PostProductProps {
    const {id, partId, backIndex, isShown} = ownProps;

    const product = state.productBase.items[id];
    const {brand, title, smallPicUrl} = product;

    const blogProductItems = state.blogProduct.items;
    const blockProductKey = Object.keys(blogProductItems).find(_id => blogProductItems[_id].productId === id);
    const blogProductItem = blockProductKey && blogProductItems[blockProductKey];
    const comment = blogProductItem && blogProductItem.comment;

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
        comment,
        color,
        backIndex,
        isShown,
        postId,
        colorPicUrl,
        colorTitle,
    };
}

const ConnectedPostProduct = connect(mapStateToProps)(PostProduct);

export default ConnectedPostProduct;