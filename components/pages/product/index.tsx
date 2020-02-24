import React, {Component} from 'react';
import {connect} from 'react-redux';

import MobileLayout from '../../layouts/MobileLayout';

import ProductHead from './components/ProductHead';
import ProductInfo from './components/ProductInfo';
import ProductPics from './components/ProductPics';
import ProductColors from './components/ProductColors';
import ProductDescription from './components/ProductDescription';
import ProductOpinions from './components/ProductOpinions';

import {ProductId} from '../../../entities/ProductBase/types';
import PostsList from '../../widgets/PostsList';
import {AppState} from '../../../store';
import {PostId} from '../../../entities/Post/types';

export interface ProductPagePublicProps {
    id: ProductId;
};

interface ProductPageProps {
    id: ProductId;
    postIds: PostId[],
}

class ProductPage extends Component<ProductPageProps> {
    render() {
        const {id, postIds} = this.props;

        return (
            <MobileLayout>
                <ProductHead />
                <ProductInfo id={id} />
                <ProductPics id={id} />
                <ProductColors id={id} />
                <ProductDescription id={id} />
                <ProductOpinions id={id} />
                <PostsList
                    title="Все посты с продуктом"
                    postIds={postIds}
                    namesVisible={true}
                    colorsVisible={true}
                />
            </MobileLayout>
        )
    }
}

function mapStateToProps(state: AppState, ownProps: ProductPagePublicProps) {
    const {id} = ownProps;

    const {postIds} = state.productExtra.items[id];

    return {
        id,
        postIds,
    };
}

const ConnectedProductPage = connect(mapStateToProps)(ProductPage);

export default ConnectedProductPage;
