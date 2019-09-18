import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';

const styles = require('./styles.styl');

export interface ProductPostsPublicProps {
    id: ProductId;
}

interface ProductPostsProps {
    
}

class ProductPosts extends Component<ProductPostsProps> {
    render() {
        const {} = this.props;

        return (
            <div className={styles.root}>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductPostsPublicProps): ProductPostsProps {
    const {id} = ownProps;

    const productExtra = state.productExtra.items[id];

    return {
    };
}

const ConnectedProductPosts = connect(mapStateToProps)(ProductPosts);

export default ConnectedProductPosts;