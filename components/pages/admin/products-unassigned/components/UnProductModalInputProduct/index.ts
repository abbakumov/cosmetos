import {connect} from 'react-redux';

import MaterialDropDown, {
    SuggestItem,
    DataProps,
} from '../../../../../widgets/MaterialDropDown';
import {AppState} from '../../../../../../store';
import {ProductId} from '../../../../../../entities/ProductBase/types';

import {
    pageAdminUnProductChangeTextAction,
    pageAdminUnProductChangeValueAction,
} from '../../state/actions';

const getProductItems = (state: AppState, filterText: string, productIds: ProductId[]): SuggestItem[] =>
    Object.values(state.productBase.items)
        .filter(product => productIds.includes(product.id))
        .filter(product => product.title.toLowerCase().includes(filterText.toLowerCase()))
        .map(product => ({
            id: product.id,
            value: product.title,
        }));

const mapStateToProps = (state: AppState): DataProps => {
    const {activeProductText, activeBrandId} = state.pageAdminUnProducts;
    const {productIds} = state.brandProducts.items[activeBrandId] || {productIds: []};

    return {
        inputValue: activeProductText,
        items: getProductItems(state, activeProductText, productIds),
        label: 'Продукт',
        isActive: true,
    };
};

const actionProps = {
    fieldChange: (id: ProductId) => pageAdminUnProductChangeValueAction('activeProductId', id),
    fieldTextChange: (text: string) => pageAdminUnProductChangeTextAction('activeProductText', text),
};

export default connect(mapStateToProps, actionProps)(MaterialDropDown);