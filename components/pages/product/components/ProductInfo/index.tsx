import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';

const styles = require('./styles.styl');

export interface ProductInfoPublicProps {
    id: ProductId;
}

interface ProductInfoProps {
    brand: string;
    title: string;
    description: string;
}

class ProductInfo extends Component<ProductInfoProps> {
    render() {
        const {brand, title, description} = this.props;

        return (
            <div>
                <span className={styles.brand}>{brand}</span>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{description}</p>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductInfoPublicProps): ProductInfoProps {
    const {id} = ownProps;

    const productBase = state.productBase.items[id];
    const productExtra = state.productExtra.items[id];

    const {title, brand} = productBase;
    const {description} = productExtra;

    return {
        brand,
        title,
        description,
    };
}

const ConnectedProductInfo = connect(mapStateToProps)(ProductInfo);

export default ConnectedProductInfo;