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

const styles = require('./styles.styl');

export interface ProductPagePublicProps {
    id: ProductId;
};

interface ProductPageProps {
    id: ProductId;
    postIds: PostId[],
    fullTitle: string,
}

declare global {
    interface Window {
        YaMarketAffiliate?: any;
    }
}

class ProductPage extends Component<ProductPageProps> {
    setupYaMarketAffiliate = () => {
        window.removeEventListener('YaMarketAffiliateLoad', this.setupYaMarketAffiliate);
        this.installYaMarketAffiliateWidget();
    }

    installYaMarketAffiliateWidget() {
        window.YaMarketAffiliate.createWidget({
            containerId: 'yaMarketOffers',
            type: 'offers',
            params: {
                clid: 2409813,
                searchText: this.props.fullTitle,
                themeId: 4,
            }
        });
    }

    componentDidMount() {
        if ('YaMarketAffiliate' in window) {
            this.setupYaMarketAffiliate();
        } else {
            window.addEventListener('YaMarketAffiliateLoad', this.setupYaMarketAffiliate);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('YaMarketAffiliateLoad', this.setupYaMarketAffiliate);
    }

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
                <div className={styles.offersContainer} id="yaMarketOffers" />
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

    const {brand, title} = state.productBase.items[id];
    const {postIds} = state.productExtra.items[id];

    const fullTitle = `${brand} ${title}`;

    return {
        id,
        postIds,
        fullTitle,
    };
}

const ConnectedProductPage = connect(mapStateToProps)(ProductPage);

export default ConnectedProductPage;
