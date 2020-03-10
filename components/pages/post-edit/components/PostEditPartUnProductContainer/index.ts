import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';

import PostEditPartProduct, {
    DataProps as PostEditPartProductDataProps,
    ActionProps as PostEditPartProductActionProps,
} from '../PostEditPartProduct';

export interface PublicProps {
    id: ProductId
}

function mapStateToProps(state: AppState, ownProps: PublicProps): PostEditPartProductDataProps {
    return {
        id: ownProps.id,
        brand: 'brand placeholder',
        product: 'product placeholder',
        color: 'color placeholder',
    };
}

const actionProps = {
    productRemoveAction: () => {console.log('remove unassigned!')},
};

const PostEditPartUnProductContainer = connect<
        PostEditPartProductDataProps,
        PostEditPartProductActionProps,
        PublicProps
    >(mapStateToProps, actionProps)(PostEditPartProduct);

export default PostEditPartUnProductContainer;
