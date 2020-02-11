import {Component} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';

const styles = require('./styles.styl');

export interface ProductColorItemProps {
    id: ProductId
    index: number
}

interface MappedProps {
    title: string
    picUrl: string
    index: number
}

interface ActionProps {
    onClick(): void
}

interface Props extends MappedProps, ActionProps {}

interface State {
    isOpen: boolean;
}

class ProductColorItem extends Component<Props, State> {
    render() {
        const {title, picUrl, index} = this.props;

        const isLeftItem = (index % 6) === 0;
        const isRightItem = (index % 6) === 5;

        const tooltipClassName = cn(
            styles.tooltip,
            {
                [styles.tooltipLeft]: isLeftItem,
                [styles.tooltipRight]: isRightItem,
            }
        );

        return (
            <div className={styles.root}>
                {false && (
                    <div className={tooltipClassName}>
                        <div className={styles.tooltipContent}>{title}</div>
                        <div className={styles.tooltipTriangle} />
                    </div>
                )}
                <img src={picUrl} />
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductColorItemProps): MappedProps {
    const {title, picUrl} = state.productColor.items[ownProps.id];

    return {
        title,
        picUrl,
        index: ownProps.index,
    };
}

const actionProps = {
    onClick() {}
};

const ConnectedProductColorItem = connect(mapStateToProps, actionProps)(ProductColorItem);

export default ConnectedProductColorItem;
