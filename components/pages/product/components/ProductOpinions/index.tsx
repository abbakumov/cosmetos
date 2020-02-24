import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {BlogProductId} from '../../../../../entities/BlogProduct/types';

import ProductOpinionsItem from './Item';
import ActionButton from '../../../../widgets/ActionButton';
const styles = require('./styles.styl');

export interface ProductOpinionsPublicProps {
    id: ProductId
}

interface ProductOpinionsProps {
    opinionIds: BlogProductId[]
    isVisible: boolean
    isAddCommentActive: boolean
}

class ProductOpinions extends Component<ProductOpinionsProps> {
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
                            // onClick={}
                        />
                    </div>
                )}
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

function mapStateToProps(state: AppState, ownProps: ProductOpinionsPublicProps): ProductOpinionsProps {
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

const ConnectedProductOpinions = connect(mapStateToProps)(ProductOpinions);

export default ConnectedProductOpinions;
