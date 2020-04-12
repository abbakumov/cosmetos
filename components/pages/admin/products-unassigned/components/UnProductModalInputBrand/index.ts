import {connect} from 'react-redux';

import MaterialDropDown, {
    SuggestItem,
    DataProps,
} from '../../../../../widgets/MaterialDropDown';
import {AppState} from '../../../../../../store';
import {BrandId} from '../../../../../../entities/Brand/types';

import {
    pageAdminUnProductChangeTextAction,
    pageAdminUnProductChangeValueAction,
} from '../../state/actions';

const getBrandItems = (state: AppState, filterText: string): SuggestItem[] => Object.values(state.brand.items)
    .filter(brand => brand.titleFull.toLowerCase().includes(filterText.toLowerCase()))
    .map(brand => ({
        id: brand.id,
        value: brand.titleShort,
    }));

const mapStateToProps = (state: AppState): DataProps => {
    const {activeBrandText} = state.pageAdminUnProducts;

    return {
        inputValue: activeBrandText,
        items: getBrandItems(state, activeBrandText),
        label: 'Бренд',
        isActive: true,
    };
};

const actionProps = {
    fieldChange: (id: BrandId) => pageAdminUnProductChangeValueAction('activeBrandId', id),
    fieldTextChange: (text: string) => pageAdminUnProductChangeTextAction('activeBrandText', text),
};

export default connect(mapStateToProps, actionProps)(MaterialDropDown);