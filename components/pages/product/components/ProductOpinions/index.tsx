import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {BlogProductId} from '../../../../../entities/BlogProduct/types';

import ProductOpinionsItem from './Item';
const styles = require('./styles.styl');

export interface ProductOpinionsPublicProps {
    id: ProductId
}

interface ProductOpinionsProps {
    opinionIds: BlogProductId[]
    isVisible: boolean
}

class ProductOpinions extends Component<ProductOpinionsProps> {
    render() {
        const {opinionIds, isVisible} = this.props;

        if (!isVisible) {
            return null;
        }

        return (
            <div className={styles.root}>
                <div className={styles.title}>Отзывы о продукте</div>
                <div>
                    {opinionIds.map(id => (
                        <ProductOpinionsItem key={id} id={id} />
                    ))}
                </div>
                {/* TODO: more button */}
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductOpinionsPublicProps): ProductOpinionsProps {
    const {id} = ownProps;

    const opinionsIds = Object.keys(state.blogProduct.items);
    const filteredOpinionIds = opinionsIds
        .filter(_id => state.blogProduct.items[_id].productId === id)
        .map(_id => parseInt(_id));

    let isVisible = false;
    try {
        isVisible = Boolean(state.blog.currentLogin) // blogger is logged in
        || state.productExtra.items[id].blogProductIds.length > 0; // any opinions is able
    } catch (e) {
        console.warn('error in ProductOpinions mapStateToProps');
    }

    return {
        opinionIds: filteredOpinionIds,
        isVisible,
    };
}

const ConnectedProductOpinions = connect(mapStateToProps)(ProductOpinions);

export default ConnectedProductOpinions;
