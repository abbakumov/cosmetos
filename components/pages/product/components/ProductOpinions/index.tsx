import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {BlogProductId} from '../../../../../entities/BlogProduct/types';
import {pageProductEditCommentAction} from '../../state/actions';
import ActionButton from '../../../../widgets/ActionButton';

import ProductOpinionsItem from './Item';
import ProductOpinionsEdit from './Edit';
const styles = require('./styles.styl');

export interface ProductOpinionsProps {
    id: ProductId
}

interface MappedProps {
    opinionIds: BlogProductId[]
    isVisible: boolean
    isAddCommentActive: boolean
}

interface ActionProps {
    editCommentAction(): void
}

interface Props extends MappedProps, ActionProps {}

class ProductOpinions extends Component<Props> {
    editCommentAction = () => this.props.editCommentAction();

    render() {
        const {opinionIds, isVisible, isAddCommentActive} = this.props;

        if (!isVisible) {
            return null;
        }

        return (
            <div className={styles.root}>
                <div className={styles.title}>Отзывы о продукте</div>
                {isAddCommentActive && (
                    <div className={styles.addCommentButton}>
                        <ActionButton
                            text="Оставить отзыв"
                            onClick={this.editCommentAction}
                        />
                    </div>
                )}
                <ProductOpinionsEdit />
                <div>
                    {opinionIds.map(id => (
                        <ProductOpinionsItem key={id} id={id} />
                    ))}
                </div>
                {/* TODO: more button */}
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: ProductOpinionsProps): MappedProps {
    const {id} = ownProps;
    const bpItems = state.blogProduct.items;
    const {currentLogin} = state.blog;

    const opinionsIds = Object.keys(state.blogProduct.items);
    const filteredOpinionIds = opinionsIds
        .filter(_id => bpItems[_id].productId === id)
        .map(_id => parseInt(_id));

    const {blogProductIds} = state.productExtra.items[id];

    let isVisible = false;
    try {
        isVisible = Boolean(currentLogin) // blogger is logged in
        || blogProductIds.length > 0; // any opinions is able
    } catch (e) {
        console.warn('error in ProductOpinions mapStateToProps');
    }

    const isAddCommentActive =
        Boolean(currentLogin) // any user is logged in
        && !blogProductIds.some(id => bpItems[id].blogLogin === currentLogin) // no current blog comments
        && !state.pageProduct.commentEdit; // no comment in edit

    return {
        opinionIds: filteredOpinionIds,
        isVisible,
        isAddCommentActive,
    };
}

const actions = {
    editCommentAction: pageProductEditCommentAction,
};

const ConnectedProductOpinions = connect(mapStateToProps, actions)(ProductOpinions);

export default ConnectedProductOpinions;
