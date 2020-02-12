import {Component} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {pageProductShowColorAction} from '../../state/actions';

const styles = require('./styles.styl');

export interface ProductColorItemProps {
    id: ProductId
    index: number
}

interface MappedProps {
    id: number
    title: string
    picUrl: string
    index: number
    isOpen: boolean
}

interface ActionProps {
    showColorAction(id: number): void
}

interface Props extends MappedProps, ActionProps {}

interface State {
    isOpenDelayed: boolean;
}

class ProductColorItem extends Component<Props, State> {
    state = {
        isOpenDelayed: false,
    };

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.isOpen && this.props.isOpen) {
            setInterval(this.showDelayed, 100);
        }
        if (prevProps.isOpen && !this.props.isOpen) {
            setInterval(this.hideDelayed, 100);
        }
    }

    showDelayed = () => this.props.isOpen && this.setState({isOpenDelayed: true});

    hideDelayed = () => !this.props.isOpen && this.setState({isOpenDelayed: false});

    onClick = () => this.props.showColorAction(this.props.id);

    render() {
        const {title, picUrl, index, isOpen} = this.props;
        const {isOpenDelayed} = this.state;

        const isLeftItem = (index % 6) === 0;
        const isRightItem = (index % 6) === 5;

        const tooltipClassName = cn(
            styles.tooltip,
            {
                [styles.tooltipLeft]: isLeftItem,
                [styles.tooltipRight]: isRightItem,
                [styles.tooltipActive]: isOpen && isOpenDelayed,
            }
        );

        const tooltipTriangleClassName = cn(
            styles.tooltipTriangle,
            {
                [styles.tooltipTriangleActive]: isOpen && isOpenDelayed,
            }
        );

        const isNodeActive = isOpen || isOpenDelayed;

        return (
            <div className={styles.root} onClick={this.onClick}>
                {isNodeActive && (
                    <div className={tooltipClassName}>
                        <div className={styles.tooltipContent}>{title}</div>
                    </div>
                )}
                {isNodeActive && (
                    <div className={tooltipTriangleClassName} />
                )}
                <img src={picUrl} />
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductColorItemProps): MappedProps {
    const {title, picUrl} = state.productColor.items[ownProps.id];
    const {activeColorId} = state.pageProduct;

    return {
        id: ownProps.id,
        title,
        picUrl,
        index: ownProps.index,
        isOpen: activeColorId === ownProps.id,
    };
}

const actionProps = {
    showColorAction: pageProductShowColorAction,
};

const ConnectedProductColorItem = connect(mapStateToProps, actionProps)(ProductColorItem);

export default ConnectedProductColorItem;
