import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';

const styles = require('./styles.styl');

export interface ProductPicsPublicProps {
    id: ProductId;
}

interface ProductPicsProps {
    imageUrl: string;
}

class ProductPics extends Component<ProductPicsProps> {
    render() {
        const {imageUrl} = this.props;

        return (
            <div className={styles.root}>
                <img className={styles.image} src={imageUrl} />
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductPicsPublicProps): ProductPicsProps {
    const {id} = ownProps;

    const productExtra = state.productExtra.items[id];
    const {bigPicUrl} = productExtra;

    return {
        imageUrl: bigPicUrl,
    };
}

const ConnectedProductPics = connect(mapStateToProps)(ProductPics);

export default ConnectedProductPics;