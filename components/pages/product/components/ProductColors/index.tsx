import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColor} from '../../../../../entities/ProductColor/types';
import ActionButton from '../../../../widgets/ActionButton';
import SectionTitle from '../../../../widgets/SectionTitle';

const styles = require('./styles.styl');

export interface ProductColorsPublicProps {
    id: ProductId;
}

interface ProductColorsProps {
    colors: ProductColor[]
}

interface State {
    isOpen: boolean;
}

class ProductColors extends Component<ProductColorsProps, State> {
    state = {
        isOpen: false,
    };

    getColorsToShow():ProductColor[] {
        const {colors} = this.props;

        if (this.state.isOpen || colors.length <= 12) {
            return colors;
        }
        
        return colors.slice(0, 6);
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
                    {colors.map(color => (
                        <div key={color.id} className={styles.item}>
                            <img className={styles.image} src={color.picUrl} />
                        </div>
                    ))}
                    {fakeIds.map(id => (<div key={id} className={styles.item} />))}
                </div>
                {this.props.colors.length > 12 && !this.state.isOpen &&
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

    const colors = colorIds.map(id => state.productColor.items[id]);

    return {
        colors,
    };
}

const ConnectedProductColors = connect(mapStateToProps)(ProductColors);

export default ConnectedProductColors;