import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';

const styles = require('./styles.styl');

export interface ProductDescriptionPublicProps {
    id: ProductId;
}

interface ProductDescriptionProps {
    description: string;
}

class ProductDescription extends Component<ProductDescriptionProps> {
    render() {
        const {description} = this.props;

        return (
            <div>
                <p className={styles.description}>{description}</p>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductDescriptionPublicProps): ProductDescriptionProps {
    const {id} = ownProps;
    const productExtra = state.productExtra.items[id];
    const {description} = productExtra;

    return {
        description,
    };
}

const ConnectedProductDescription = connect(mapStateToProps)(ProductDescription);

export default ConnectedProductDescription;