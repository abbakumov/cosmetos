import {FunctionComponent} from 'react';
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
} from '../../store/actions';

const styles = require('./styles.styl');

interface SuggestItem {
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
    fieldChange(value: string): void;
    fieldTextChange(value: string): void;
}

interface Props extends MappedProps, ActionProps {}

const PostEditPartProductDropDown: FunctionComponent<Props> = (props: Props) => {
    if (!props.isActive) {
        return null;
    }

    return (
        <div className={styles.root}>
            <Downshift
                onChange={value => props.fieldChange(value)}
                inputValue={props.value}
                onInputValueChange={value => props.fieldTextChange(value)}
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
                                label={props.label}
                                {...getInputProps()}
                                fullWidth
                            />
                            {isOpen &&
                                <Paper className={styles.suggest}>
                                    {props.items
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

function getFilteredBrandItems(items: BrandMap, value: string): SuggestItem[] {
    return Object.keys(items)
        .filter(id => items[id].fullName.toLowerCase().includes(value.toLowerCase()))
        .map(id => ({
            value: items[id].fullName,
            id,
        }))
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
                items = productIds
                    .map(id => state.productBase.items[id])
                    .map(({title}) => ({value: title}));
            } else {
                isActive = false;
            }

            break;

        case 'color':
            isActive = false;
            label = 'Цвет';
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
        fieldChange(value?: string) {
            switch (ownProps.id) {
                case 'brand':
                    dispatch(postEditProductBrandChangeAction(value));
                    break;
                
                case 'product':
                    dispatch(postEditProductProductChangeAction(value));
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
