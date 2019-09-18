import React, {Component} from 'react';

import MobileLayout from '../../layouts/MobileLayout';

import ProductInfo from './components/ProductInfo';
import ProductPics from './components/ProductPics';
import ProductColors from './components/ProductColors';
import ProductPosts from './components/ProductPosts';

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
                <ProductPics id={id} />
                <ProductColors id={id} />
                <ProductPosts id={id} />
                {/*<ProductOpinions />*/}
            </MobileLayout>
        )
    }
}

export default ProductPage;