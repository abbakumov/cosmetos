import {connect} from 'react-redux';

import {UnProductId, UnProduct} from '../../../../../entities/UnProduct/types';
import {PostPartId} from '../../../../../entities/PostPart/types';
import {AppState} from '../../../../../store';

import PostProduct, {PostProductProps} from '../PostProduct';

export interface UnPostProductProps {
    id: UnProductId
    partId: PostPartId
    backIndex: number
    isShown: boolean
}

function mapStateToProps(state: AppState, props: UnPostProductProps): PostProductProps {
    const {id, partId, backIndex, isShown} = props;

    const {color} = state.postPart.items[partId];
    const brandItems = state.brand.items;
    const productItems = state.productBase.items;
    const unProduct = state.unProduct.items[id] as UnProduct;
    const {
        brandId,
        brandText,
        productId,
        productText,
        productColorText,
    } = unProduct;

    const brand = brandId ? brandItems[brandId].titleShort : brandText;
    const title = productId ? productItems[productId].title : productText;

    return {
        id,
        brand,
        title,
        color,
        colorTitle: productColorText,
        backIndex,
        isShown,
        isUnassigned: true,
    };
}

const UnPostProductContainer = connect(mapStateToProps)(PostProduct);

export default UnPostProductContainer;
