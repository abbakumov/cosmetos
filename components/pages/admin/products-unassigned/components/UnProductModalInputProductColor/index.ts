import {connect} from 'react-redux';

import MaterialDropDown, {
    SuggestItem,
    DataProps,
} from '../../../../../widgets/MaterialDropDown';
import {AppState} from '../../../../../../store';
import {ProductColorId} from '../../../../../../entities/ProductColor/types';

import {
    pageAdminUnProductChangeTextAction,
    pageAdminUnProductChangeValueAction,
} from '../../state/actions';

const getProductItems = (state: AppState, filterText: string, colorIds: ProductColorId[]): SuggestItem[] =>
    Object.values(state.productColor.items)
        .filter(productColor => colorIds.includes(productColor.id))
        .filter(productColor => productColor.title.toLowerCase().includes(filterText.toLowerCase()))
        .map(productColor => ({
            id: productColor.id,
            value: productColor.title,
        }));

const mapStateToProps = (state: AppState): DataProps => {
    const {activeProductColorText, activeProductId} = state.pageAdminUnProducts;
    const {colorIds} = state.productExtra.items[activeProductId] || {colorIds: []};

    return {
        inputValue: activeProductColorText,
        items: getProductItems(state, activeProductColorText, colorIds),
        label: 'Цвет',
        isActive: true,
    };
};

const actionProps = {
    fieldChange: (id: ProductColorId) => pageAdminUnProductChangeValueAction('activeProductColorId', id),
    fieldTextChange: (text: string) => pageAdminUnProductChangeTextAction('activeProductColorText', text),
};

export default connect(mapStateToProps, actionProps)(MaterialDropDown);