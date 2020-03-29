import {connect} from 'react-redux';

import {BrandMap} from '../../../../../entities/Brand/types';
import {AppState} from '../../../../../store';

import {
    postEditProductFieldTextChangeAction,
    postEditProductBrandChangeAction,
    postEditProductProductChangeAction,
    postEditProductColorChangeAction,
} from '../../store/actions';
import {ProductBase, ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColor} from '../../../../../entities/ProductColor/types';

import MaterialDropDown, {
    SuggestItem,
    DataProps as MaterialDropDownDataProps,
    ActionProps as MaterialDropDownActionProps,
} from '../../../../widgets/MaterialDropDown';


export interface PostEditPartProductDropDownProps {
    id: 'brand' | 'product' | 'color'
}


function getFilteredBrandItems(items: BrandMap, value: string): SuggestItem[] {
    return Object.keys(items)
        .filter(id => items[id].titleFull.toLowerCase().includes(value.toLowerCase()))
        .map(id => ({
            id: items[id].id,
            value: items[id].titleFull,
        }))
}

function getFilteredProductItems(items: ProductBase[], value: string, usedIds: ProductId[]): SuggestItem[] {
    return items
        .filter(product => usedIds.indexOf(product.id) === -1) // not used in this post
        .filter(product => product.title.toLowerCase().includes(value.toLowerCase())) // matches search string
        .map(({id, title}) => ({
            id,
            value: title,
        }));
}

function getFilteredColorItems(items: ProductColor[], value: string): SuggestItem[] {
    return items
        .filter(color => color.title.toLowerCase().includes(value.toLowerCase()))
        .map(({id, title}) => ({id, value: title}));
}

function mapStateToProps(state: AppState, ownProps: PostEditPartProductDropDownProps): MaterialDropDownDataProps {
    const {id} = ownProps;
    const {postEdit, editPostPartProduct} = state.pagePostEdit;

    const {
        brandId,
        brandText,
        productId,
        productText,
        productColorText,
    } = editPostPartProduct;

    let inputValue = '';
    let items = [];
    let label = '';

    let isActive = false;

    switch (id) {
        case 'brand':
            label = 'Бренд';
            isActive = true;
    
            inputValue = brandText;
            items = getFilteredBrandItems(state.brand.items, inputValue);
            break;

        case 'product':
            const brandProductsItem = state.brandProducts.items[brandId];
            const productIds = brandProductsItem ? brandProductsItem.productIds : [];

            const postId = postEdit.id;

            // collect all ids which already in use in this post
            // we need to filter them and make them unable to chose
            const usedIds = Object.values(state.postProduct.items)
                .reduce(
                    (acc, postProductItem) => {
                        if (postId !== postProductItem.postId) {return acc;}
                        return [...acc, postProductItem.productId];
                    },
                    []
                );

            if (brandId || brandText) {
                label = 'Продукт';
                isActive = true;

                inputValue = productText;
                items = getFilteredProductItems(
                    productIds.map(id => state.productBase.items[id]),
                    productText,
                    usedIds
                );
            }
            break;

        case 'color':
            const productExtraItem = state.productExtra.items[productId];
            const colorIds = productExtraItem ? productExtraItem.colorIds : [];

            if (productId || productText) {
                label = 'Цвет';
                isActive = true;

                inputValue = productColorText;
                items = getFilteredColorItems(
                    colorIds.map(id => state.productColor.items[id]),
                    productColorText
                );
            }
            break;
    }

    return {inputValue, items, label, isActive};
}


function mapDispatchToProps(dispatch, ownProps: PostEditPartProductDropDownProps): MaterialDropDownActionProps {
    let textChangeFieldName = '';

    switch (ownProps.id) {
        case 'brand':
            textChangeFieldName = 'brandText';
            break;

        case 'product':
            textChangeFieldName = 'productText';
            break;

        case 'color':
            textChangeFieldName = 'productColorText';
            break;
    }

    return {
        fieldChange(value: number) {
            switch (ownProps.id) {
                case 'brand':
                    dispatch(postEditProductBrandChangeAction(value));
                    break;

                case 'product':
                    dispatch(postEditProductProductChangeAction(value));
                    break;

                case 'color':
                    dispatch(postEditProductColorChangeAction(value));
                    break;
            }
        },
        fieldTextChange(value?: string) {
            dispatch(postEditProductFieldTextChangeAction(textChangeFieldName, value || ''));
        }
    };
};

const ConnectedPostEditPartProductDropDown =
    connect(mapStateToProps, mapDispatchToProps)(MaterialDropDown);

export default ConnectedPostEditPartProductDropDown;
