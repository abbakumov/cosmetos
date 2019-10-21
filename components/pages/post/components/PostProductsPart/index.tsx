import {Component} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {scrollToWhen} from 'react-redux-scroll';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/PostBase/types';
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

class PostProductsPart extends Component<Props> {
    togglePart = () => this.props.postPageTogglePartAction(this.props.id)

    render() {
        const {id, title, color, productIds, isOpen} = this.props;

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
                {isOpen &&
                    <div className={styles.productsContainer}>
                        {productIds.map(_id => (
                            <PostProduct key={id} id={_id} partId={id}/>
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