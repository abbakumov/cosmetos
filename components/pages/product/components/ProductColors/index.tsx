import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColor} from '../../../../../entities/ProductColor/types';

const styles = require('./styles.styl');

export interface ProductColorsPublicProps {
    id: ProductId;
}

interface ProductColorsProps {
    colors: ProductColor[]
}

class ProductColors extends Component<ProductColorsProps> {
    render() {
        const {colors} = this.props;

        return (
            <div className={styles.root}>
                {colors.map(color => (
                    <div key={color.id} className={styles.item}>
                        <img className={styles.image} src={color.picUrl} />
                    </div>
                ))}
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductColorsPublicProps): ProductColorsProps {
    const {id} = ownProps;

    const productExtra = state.productExtra.items[id];
    const {colorIds} = productExtra;

    const colors = colorIds.map(id => state.productColor.items[id]);

    return {
        colors,
    };
}

const ConnectedProductColors = connect(mapStateToProps)(ProductColors);

export default ConnectedProductColors;