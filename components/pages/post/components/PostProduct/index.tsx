import {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import {AppState} from '../../../../../store';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

const styles = require('./styles.styl');

export interface PostProductsPartPublicProps {
    id: ProductId;
}

interface PostProductsPartProps {
    id: number;
    brand: string;
    title: string;
    smallPicUrl: string;
    comment: string;
}

class PostProductsPart extends Component<PostProductsPartProps> {
    render() {
        const {brand, title, smallPicUrl, comment} = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.left}>
                    <img className={styles.img} src={smallPicUrl} />
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{title}</h3>
                    <div className={styles.brand}>{brand}</div>
                    <div className={styles.comment}>{comment}</div>
                </div>
                <img className={styles.arr} src="/static/icons/post-page/product-arr.svg" />
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostProductsPartPublicProps): PostProductsPartProps {
    const {id} = ownProps;

    const product = state.productBase.items[id];
    const {brand, title, smallPicUrl} = product;

    const blogProductItems = state.blogProduct.items;
    const blockProductKey = Object.keys(blogProductItems).find(_id => blogProductItems[_id].productId === id);
    const comment = state.blogProduct.items[blockProductKey].comment;

    return {
        id,
        brand,
        title,
        smallPicUrl,
        comment,
    };
}

const ConnectedPostProductsPart = connect(mapStateToProps)(PostProductsPart);

export default ConnectedPostProductsPart;