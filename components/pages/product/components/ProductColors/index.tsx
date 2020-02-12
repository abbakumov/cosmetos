import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColorId} from '../../../../../entities/ProductColor/types';
import ActionButton from '../../../../widgets/ActionButton';
import SectionTitle from '../../../../widgets/SectionTitle';

import ProductColorItem from '../ProductColorItem';

const styles = require('./styles.styl');

export interface ProductColorsPublicProps {
    id: ProductId
}

interface ProductColorsProps {
    colorIds: ProductColorId[]
}

interface State {
    isOpen: boolean;
}

class ProductColors extends Component<ProductColorsProps, State> {
    state = {
        isOpen: false,
    };

    getColorsToShow():ProductColorId[] {
        const {colorIds} = this.props;

        if (this.state.isOpen || colorIds.length <= 12) {
            return colorIds;
        }
        
        return colorIds.slice(0, 6);
    }

    open = () => {
        this.setState({isOpen: true});
    };

    render() {
        const colors = this.getColorsToShow();

        if (!colors.length) {
            return null;
        }

        const _restSlotsCount = 6 - (colors.length % 6);
        const restSlotsCount = _restSlotsCount === 6 ? 0 : _restSlotsCount;

        const fakeIds = [];
        for (let i = 0; i < restSlotsCount; i++) fakeIds.push(i * -1);

        return (
            <div className={styles.root}>
                <SectionTitle>Оттенки</SectionTitle>
                <div className={styles.colors}>
                    {colors.map((colorId, index) => (
                        <ProductColorItem id={colorId} key={colorId} index={index} />
                    ))}
                    {fakeIds.map(id => (<div key={id} className={styles.emptyItem} />))}
                </div>
                {this.props.colorIds.length > 12 && !this.state.isOpen &&
                    <div className={styles.actionButton}>
                        <ActionButton
                            text="другие цвета"
                            onClick={this.open}
                        />
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductColorsPublicProps): ProductColorsProps {
    const {id} = ownProps;

    const productExtra = state.productExtra.items[id];
    const {colorIds} = productExtra;

    return {colorIds};
}

const ConnectedProductColors = connect(mapStateToProps)(ProductColors);

export default ConnectedProductColors;