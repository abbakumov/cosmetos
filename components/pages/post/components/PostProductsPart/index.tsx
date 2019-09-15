import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/PostBase/types';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

import PostProduct from '../PostProduct';

const styles = require('./styles.styl');

export interface PostProductsPartPublicProps {
    id: PostId;
}

interface PostProductsPartProps {
    id: PostPartId;
    title: string;
    color: string;
    productIds: ProductId[];
}

class PostProductsPart extends Component<PostProductsPartProps> {
    render() {
        const {id, title, color, productIds} = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.head} style={{backgroundColor: color}}>
                    {title}
                    <img
                        className={styles.headArr}
                        src="/static/icons/post-page/part-arrow-down.svg"
                    />
                </div>
                <div className={styles.productsContainer}>
                    {productIds.map(id => (
                        <PostProduct key={id} id={id}/>
                    ))}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostProductsPartPublicProps): PostProductsPartProps {
    const {id} = ownProps;

    const postPart = state.postPart.items[id];
    const {title, color, productIds} = postPart;

    return {
        id,
        title,
        color,
        productIds,
    };
}

const ConnectedPostProductsPart = connect(mapStateToProps)(PostProductsPart);

export default ConnectedPostProductsPart;