import React, {Component} from 'react';

import MobileLayout from '../../layouts/MobileLayout';

import ProductInfo from './components/ProductInfo';

import {ProductId} from '../../../entities/ProductBase/types';

export interface ProductPagePublicProps {
    id: ProductId,
};

class ProductPage extends Component<ProductPagePublicProps> {
    render() {
        const {id} = this.props;

        return (
            <MobileLayout>
                <ProductInfo id={id} />
                {/*<ProductPics />
                <ProductColors />
                <ProductPosts />
                <ProductOpinions />*/}
            </MobileLayout>
        )
    }
}

export default ProductPage;