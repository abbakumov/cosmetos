import {Component} from 'react';
import {connect} from 'react-redux';
import {scrollToWhen} from 'react-redux-scroll';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

import PostProduct from '../PostProduct';
import {postPageTogglePartAction, POST_PAGE_SCROLL_TO_PART} from '../../state/actions';

const styles = require('./styles.styl');

export interface PostProductsPartPublicProps {
    id: PostId;
}

interface MappedProps {
    id: PostPartId;
    title: string;
    color: string;
    productIds: ProductId[];
    isOpen: boolean;
}

interface DispatchedProps {
    postPageTogglePartAction(id: PostPartId): void,
}

interface Props extends MappedProps, DispatchedProps {}
interface State {
    // are nodes rendered in DOM?
    isNodesActive: boolean;
    // are nodes shown to user?
    isNodesShown: boolean;
    removeTimeoutId?: number;
}

class PostProductsPart extends Component<Props, State> {
    state = {
        isNodesActive: false,
        isNodesShown: false,
        removeTimeoutId: null,
    };

    togglePart = () => this.props.postPageTogglePartAction(this.props.id);

    showNodes = () => {
        // immediatly render nodes
        this.setState({isNodesActive: true});

        clearTimeout(this.state.removeTimeoutId);

        // show them to user after 100ms
        setTimeout(
            () => {
                // of course if it's still need to be shown
                if (this.props.isOpen) {
                    this.setState({isNodesShown: true});
                }
            },
            100
        );
    };

    hideNodes = () => {
        // immediatly hide nodes
        this.setState({isNodesShown: false});

        // delete them after 3 secons if they were not shown back
        const timeoutId = window.setTimeout(
            () => this.setState({isNodesActive: false}),
            3000
        );

        this.setState({removeTimeoutId: timeoutId});
    };

    componentDidMount() {
        if (this.props.isOpen) this.showNodes();
    }

    componentDidUpdate(prevProps: Props) {
        if (!prevProps.isOpen && this.props.isOpen) this.showNodes();
        if (prevProps.isOpen && !this.props.isOpen) this.hideNodes();
    }

    render() {
        const {id, title, color, productIds, isOpen} = this.props;
        const {isNodesActive, isNodesShown} = this.state;

        return (
            <div className={styles.root}>
                <div
                    className={styles.head}
                    style={{backgroundColor: `#${color}`}}
                    onClick={this.togglePart}
                >
                    {title}
                    {isOpen &&
                        <img
                            className={styles.headArr}
                            src="/static/icons/post-page/part-arrow-down.svg"
                        />
                    }
                    {!isOpen &&
                        <img
                            className={styles.headArr}
                            src="/static/icons/post-page/part-arrow-up.svg"
                        />
                    }
                </div>
                {isNodesActive &&
                    <div className={styles.productsContainer}>
                        {productIds.map((_id, index, arr) => (
                            <PostProduct
                                key={_id}
                                id={_id}
                                partId={id}
                                backIndex={arr.length - index}
                                isShown={isNodesShown}
                            />
                        ))}
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostProductsPartPublicProps): MappedProps {
    const {id} = ownProps;

    const postPart = state.postPart.items[id];
    const {title, color, productIds} = postPart;

    const isOpen = Boolean(state.pagePost.openParts[id]);

    return {
        id,
        title,
        color,
        productIds,
        isOpen,
    };
}

const mapDispatchToProps: DispatchedProps = {
    postPageTogglePartAction,
};

const ConnectedPostProductsPart =
    scrollToWhen({
        pattern: (action, props) => (action.type === POST_PAGE_SCROLL_TO_PART && props.id === action.payload.id),
        scrollOptions: {
            transitionTimingFunction: 'EASE_OUT_QUAD',
            yMargin: 100,
        }
    })(
        connect(mapStateToProps, mapDispatchToProps)(PostProductsPart)
    );

export default ConnectedPostProductsPart;