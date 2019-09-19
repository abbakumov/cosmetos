import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {BlogProductId} from '../../../../../entities/BlogProduct/types';

import ProductOpinionsItem from './Item';
const styles = require('./styles.styl');

export interface ProductOpinionsPublicProps {
    id: ProductId;
}

interface ProductOpinionsProps {
    opinionIds: BlogProductId[];
}

class ProductOpinions extends Component<ProductOpinionsProps> {
    render() {
        const {opinionIds} = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.title}>Мнение блогеров</div>
                <div>
                    {opinionIds.map(id => (
                        <ProductOpinionsItem key={id} id={id} />
                    ))}
                </div>
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

    return {
        opinionIds: filteredOpinionIds,
    };
}

const ConnectedProductOpinions = connect(mapStateToProps)(ProductOpinions);

export default ConnectedProductOpinions;
