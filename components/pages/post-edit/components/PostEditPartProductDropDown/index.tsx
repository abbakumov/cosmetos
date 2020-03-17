import {Component} from 'react';
import {connect} from 'react-redux';

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
import {ProductBase, ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColor} from '../../../../../entities/ProductColor/types';

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

interface State {
    isOpen: boolean
}

class PostEditPartProductDropDown extends Component<Props, State> {
    state = {
        isOpen: false,
    };

    onChange = (item) => {
        this.props.fieldChange(item.id);
    }

    onInputValueChange = (event) => {
        const {value} = event.target;

        if (this.props.inputValue !== value) {
            this.props.fieldTextChange(value);
        }
    }

    onFocus = () => {
        this.setState({isOpen: true});
    };

    onBlur = () => {
        this.setState({isOpen: false});
    };

    render() {
        if (!this.props.isActive) {
            return null;
        }

        return (
            <div className={styles.root}>
                <div className={styles.container}>
                    <TextField
                        label={this.props.label}
                        fullWidth
                        onChange={this.onInputValueChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                    {this.state.isOpen &&
                        <Paper className={styles.suggest}>
                            {this.props.items
                                .map((item, index) => (
                                    <MenuItem
                                        key={item.value}
                                        selected={false}
                                        onMouseDown={() => this.onChange(item)}
                                    >
                                        {item.value}
                                    </MenuItem>
                                ))
                            }
                        </Paper>
                    }
                </div>
            </div>
        );
    }
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

function mapStateToProps(state: AppState, ownProps: PostEditPartProductDropDownProps): MappedProps {
    const {id} = ownProps;
    const {postEdit, editPostPartProduct} = state.pagePostEdit;

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
                selectedItem = items.find(item => item.id === productId) || null;
                if (selectedItem) { inputValue = selectedItem.value; }
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
            dispatch(postEditProductFieldTextChangeAction(textChangeFieldName, value || ''));
        }
    };
};

const ConnectedPostEditPartProductDropDown =
    connect(mapStateToProps, mapDispatchToProps)(PostEditPartProductDropDown);

export default ConnectedPostEditPartProductDropDown;
