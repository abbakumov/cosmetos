import {Component} from 'react';
import {connect} from 'react-redux';
import Downshift from 'downshift';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import {BrandMap} from '../../../../../entities/Brand/types';
import {AppState} from '../../../../../store';

import {
    postEditProductFieldTextChangeAction,
    postEditProductBrandChangeAction,
    postEditProductProductChangeAction,
    postEditProductColorChangeAction,
} from '../../store/actions';
import { ProductBase } from '../../../../../entities/ProductBase/types';
import { ProductColor } from '../../../../../entities/ProductColor/types';

const styles = require('./styles.styl');

interface SuggestItem {
    id?: number;
    value: string;
}

export interface PostEditPartProductDropDownProps {
    id: 'brand' | 'product' | 'color';
}

interface MappedProps {
    inputValue: string;
    selectedItem: SuggestItem;
    items: SuggestItem[];
    label: string;
    isActive: boolean;
}

interface ActionProps {
    fieldChange(value: string | number): void;
    fieldTextChange(value: string): void;
}

interface Props extends MappedProps, ActionProps {}

function getItemId<T>(items: {id?: T, value: string}[], value: string): T {
    return items.find(item => item.value === value).id;
}

class PostEditPartProductDropDown extends Component<Props> {
    onChange = (value) => {
        // console.log('onChange value: ', value);

        if (this.props.items.length && this.props.items[0].id) {
            const id = getItemId(this.props.items, value);
            console.log('id: ', id);
            this.props.fieldChange(id);
        } else {
            this.props.fieldChange(value);
        }
    }

    onInputValueChange = (value) => {
        // console.log('current selected item: ', this.props.selectedItem);
        // console.log('current inputValue: ', this.props.inputValue);
        // console.log('value: ', value);

        if (this.props.inputValue !== value) {
            this.props.fieldTextChange(value);
        }
    }

    render() {
        if (!this.props.isActive) {
            return null;
        }

        return (
            <div className={styles.root}>
                <Downshift
                    onChange={this.onChange}
                    inputValue={this.props.inputValue}
                    selectedItem={this.props.selectedItem}
                    onInputValueChange={this.onInputValueChange}
                    itemToString={item => (item ? item.value : '')}
                >
                    {({
                        getInputProps,
                        getItemProps,
                        getLabelProps,
                        getMenuProps,
                        isOpen,
                        inputValue,
                        highlightedIndex,
                        selectedItem,
                    }) => {
                        return (
                            <div className={styles.container}>
                                <TextField
                                    label={this.props.label}
                                    {...getInputProps()}
                                    fullWidth
                                />
                                {isOpen &&
                                    <Paper className={styles.suggest}>
                                        {this.props.items
                                            .map((item, index) => (
                                                <MenuItem
                                                    {...getItemProps({item: item.value})}
                                                    key={item.value}
                                                    selected={highlightedIndex === index}
                                                >
                                                    {item.value}
                                                </MenuItem>
                                            ))
                                        }
                                    </Paper>
                                }
                            </div>
                        )
                    }}
                </Downshift>
            </div>
        );
    }
}

function getFilteredBrandItems(items: BrandMap, value: string): SuggestItem[] {
    return Object.keys(items)
        .filter(id => items[id].fullName.toLowerCase().includes(value.toLowerCase()))
        .map(id => ({
            id: items[id].id,
            value: items[id].fullName,
        }))
}

function getFilteredProductItems(items: ProductBase[], value: string): SuggestItem[] {
    return items
        .filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
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

function mapStateToProps(state: AppState, ownProps: PostEditPartProductDropDownProps): MappedProps {
    const {id} = ownProps;
    const {editPostPartProduct} = state.pagePostEdit;

    const {
        brandId,
        brandText,
        productId,
        productText,
        productColorId,
        productColorText,
    } = editPostPartProduct;

    let inputValue = '';
    let selectedItem = null;
    let value = '';
    let items = [];
    let label = '';

    let isActive = false;

    switch (id) {
        case 'brand':
            label = 'Бренд';
            isActive = true;
    
            inputValue = brandText;
            items = getFilteredBrandItems(state.brand.items, inputValue);
            selectedItem = items.find(item => item.id === brandId) || null;
            if (selectedItem) { inputValue = selectedItem.value; }
            break;

        case 'product':
            const brandProductsItem = state.brandProducts.items[brandId];
            if (brandId && brandProductsItem) {
                label = 'Продукт';
                isActive = true;

                inputValue = productText;
                items = getFilteredProductItems(
                    brandProductsItem.productIds.map(id => state.productBase.items[id]),
                    productText
                );
                selectedItem = items.find(item => item.id === productId) || null;
                if (selectedItem) { inputValue = selectedItem.value; }
            }
            break;

        case 'color':
            const broductExtraItem = state.productExtra.items[productId]
            if (productId && broductExtraItem) {
                label = 'Цвет';
                isActive = true;

                inputValue = productColorText;
                items = getFilteredColorItems(
                    broductExtraItem.colorIds.map(id => state.productColor.items[id]),
                    productColorText
                );
                selectedItem = items.find(item => item.id === productColorId) || null;
                if (selectedItem) { inputValue = selectedItem.value; }
            }
            break;
    }

    return {inputValue, selectedItem, items, label, isActive};
}


function mapDispatchToProps(dispatch, ownProps: PostEditPartProductDropDownProps): ActionProps {
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
            console.log('fieldTextChange value: ', value);
            dispatch(postEditProductFieldTextChangeAction(textChangeFieldName, value || ''));
        }
    };
};

const ConnectedPostEditPartProductDropDown =
    connect(mapStateToProps, mapDispatchToProps)(PostEditPartProductDropDown);

export default ConnectedPostEditPartProductDropDown;
