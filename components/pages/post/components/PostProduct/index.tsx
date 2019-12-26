import {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';
import cn from 'classnames';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

const styles = require('./styles.styl');

export interface PostProductsPartPublicProps {
    id: ProductId;
    partId: PostPartId;
    backIndex: number;
    isShown: boolean;
}

interface PostProductsPartProps {
    id: ProductId;
    brand: string;
    title: string;
    smallPicUrl: string;
    comment: string;
    color: string;
    backIndex: number;
    isShown: boolean;
}

class PostProductsPart extends Component<PostProductsPartProps> {
    render() {
        const {id, brand, title, smallPicUrl, comment, color, backIndex, isShown} = this.props;

        const style = {
            borderColor: `#${color}`,
            zIndex: backIndex,
        };

        const rootClassName = cn(styles.root, {
            [styles.rootHidden]: !isShown,
        });

        return (
            <Link href="/product/[id]" as={`/product/${id}`}>
                <a className={rootClassName} style={style}>
                    <div className={styles.left}>
                        <img className={styles.img} src={smallPicUrl} />
                    </div>
                    <div className={styles.content}>
                        <h3 className={styles.title}>{title}</h3>
                        <div className={styles.brand}>{brand}</div>
                        {!!comment && <div className={styles.comment}>"{comment}"</div>}
                    </div>
                    <img className={styles.arr} src="/static/icons/post-page/product-arr.svg" />
                </a>
            </Link>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostProductsPartPublicProps): PostProductsPartProps {
    const {id, partId, backIndex, isShown} = ownProps;

    const product = state.productBase.items[id];
    const {brand, title, smallPicUrl} = product;

    const blogProductItems = state.blogProduct.items;
    const blockProductKey = Object.keys(blogProductItems).find(_id => blogProductItems[_id].productId === id);
    const blogProductItem = blockProductKey && blogProductItems[blockProductKey];
    const comment = blogProductItem && blogProductItem.comment;

    const postPart = state.postPart.items[partId]
    const {color} = postPart;

    return {
        id,
        brand,
        title,
        smallPicUrl,
        comment,
        color,
        backIndex,
        isShown,
    };
}

const ConnectedPostProductsPart = connect(mapStateToProps)(PostProductsPart);

export default ConnectedPostProductsPart;