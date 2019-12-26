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

        const _restSlotsCount = 6 - (colors.length % 6);
        const restSlotsCount = _restSlotsCount === 6 ? 0 : _restSlotsCount;

        const fakeIds = [];
        for (let i = 0; i < restSlotsCount; i++) fakeIds.push(i * -1);

        return (
            <div className={styles.root}>
                {colors.map(color => (
                    <div key={color.id} className={styles.item}>
                        <img className={styles.image} src={color.picUrl} />
                    </div>
                ))}
                {fakeIds.map(id => (<div key={id} className={styles.item} />))}
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