import {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

const styles = require('./styles.styl');

export interface PostProductsPartPublicProps {
    id: ProductId;
    partId: PostPartId;
}

interface PostProductsPartProps {
    id: ProductId;
    brand: string;
    title: string;
    smallPicUrl: string;
    comment: string;
    color: string;
}

class PostProductsPart extends Component<PostProductsPartProps> {
    render() {
        const {id, brand, title, smallPicUrl, comment, color} = this.props;

        return (
            <Link href="/product/[id]" as={`/product/${id}`}>
                <a className={styles.root} style={{borderColor: `#${color}`}}>
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
    const {id, partId} = ownProps;

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
    };
}

const ConnectedPostProductsPart = connect(mapStateToProps)(PostProductsPart);

export default ConnectedPostProductsPart;