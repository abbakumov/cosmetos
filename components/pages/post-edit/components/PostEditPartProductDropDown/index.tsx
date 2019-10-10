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
    value: string;
    items: SuggestItem[];
    label: string;
    isActive: boolean;
}

interface ActionProps {
    fieldChange(value: string | number): void;
    fieldTextChange(value: string): void;
}

interface Props extends MappedProps, ActionProps {}

function getItemId<T>(items: {id: T, value: string}[], value: string): T {
    return items.find(item => item.value === value).id;
}

class PostEditPartProductDropDown extends Component<Props> {
    onChange = (value) => {
        if (this.props.items.length && this.props.items[0].id) {
            const {id} = this.props.items.find(item => item.value === value);
            this.props.fieldChange(id);
        } else {
            this.props.fieldChange(value);
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
                    inputValue={this.props.value}
                    onInputValueChange={value => this.props.fieldTextChange(value)}
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
            value: items[id].fullName,
        }))
}

function getFilteredProductItems(items: ProductBase[], value: string): SuggestItem[] {
    return items
        .filter(product => product.title.toLowerCase().includes(value.toLowerCase()))
        .map(({title}) => ({value: title}));
}

function getFilteredColorItems(items: ProductColor[], value: string): SuggestItem[] {
    return items
        .filter(color => color.title.toLowerCase().includes(value.toLowerCase()))
        .map(({id, title}) => ({id, value: title}));
}

function mapStateToProps(state: AppState, ownProps: PostEditPartProductDropDownProps): MappedProps {
    const {id} = ownProps;
    const {editPostPartProduct} = state.pagePostEdit;

    let value = '';
    let items = [];
    let label = '';
    let isActive = true;

    switch (id) {
        case 'brand':
            if (editPostPartProduct.brandId) {
                value = state.brand.items[editPostPartProduct.brandId].fullName;
            } else {
                value = editPostPartProduct.brandText;
            }
            items = getFilteredBrandItems(state.brand.items, value);
            label = 'Бренд';
            // always isActive = true
            break;

        case 'product':
            if (editPostPartProduct.productId) {
                value = state.productBase.items[editPostPartProduct.productId].title;
            } else {
                value = editPostPartProduct.productText;
            }
            label = 'Продукт';
            const {brandId} = state.pagePostEdit.editPostPartProduct;
            // brand choosed and fetched
            if (brandId && state.brandProducts.items[brandId]) {
                const {productIds} = state.brandProducts.items[brandId];
                items = getFilteredProductItems(productIds.map(id => state.productBase.items[id]), value);
            } else {
                isActive = false;
            }

            break;

        case 'color':
            if (editPostPartProduct.productColorId) {
                value = state.productColor.items[editPostPartProduct.productColorId].title;
            } else {
                value = editPostPartProduct.productColorText;
            }
            label = 'Цвет';
            const {productId} = state.pagePostEdit.editPostPartProduct;
            if (productId && state.productExtra.items[productId]) {
                const {colorIds} = state.productExtra.items[productId];
                items = getFilteredColorItems(colorIds.map(id => state.productColor.items[id]), value)
            } else {
                isActive = false;
            }

            break;
    }

    return {value, items, label, isActive};
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
        fieldChange(value?: string | number) {
            switch (ownProps.id) {
                case 'brand':
                    dispatch(postEditProductBrandChangeAction(value as string));
                    break;
                
                case 'product':
                    dispatch(postEditProductProductChangeAction(value as string));
                    break;

                case 'color':
                    dispatch(postEditProductColorChangeAction(value as number));
                    break;
            }
        },
        fieldTextChange(value?: string) {
            dispatch(postEditProductFieldTextChangeAction(textChangeFieldName, value || ''));
        }
    };
};

const ConnectedPostEditPartProductDropDown =
    connect(mapStateToProps, mapDispatchToProps)(PostEditPartProductDropDown);

export default ConnectedPostEditPartProductDropDown;
