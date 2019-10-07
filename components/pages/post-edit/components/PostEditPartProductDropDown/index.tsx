import {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import Downshift from 'downshift';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import {BrandMap} from '../../../../../entities/Brand/types';
import {AppState} from '../../../../../store';

const styles = require('./styles.styl');

interface SuggestItem {
    value: string;
}

export interface PostEditPartProductDropDownProps {
    // TODO: enum
    id: string;
}

interface MappedProps {
    value: string;
    items: SuggestItem[];
}

interface ActionProps {

}

interface Props extends MappedProps, ActionProps {}


const PostEditPartProductDropDown: FunctionComponent<Props> = (props: Props) => (
    <div className={styles.root}>
        <Downshift
            onChange={value => {
                console.log('downshift change, value: ', value);
            }}
            inputValue={props.value}
            // onInputValueChange={value => { }}
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
                            label="Бренд"
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

function getFilteredBrandItems(items: BrandMap, value: string): SuggestItem[] {
    console.log('value: ', value);
    // console.log('items: ', Object.keys(items)
    // .filter(id => items[id].fullName.includes(value)))

    return Object.keys(items)
        .filter(id => items[id].fullName.includes(value))
        .map(id => ({
            value: items[id].fullName,
        }))
}

function mapStateToProps(state: AppState, ownProps: PostEditPartProductDropDownProps): MappedProps {
    const {id} = ownProps;
    const {editPostPartProduct} = state.pagePostEdit;

    let value = '';
    let items = [];

    switch (id) {
        case 'brand':
            if (editPostPartProduct.brandId) {
                value = state.brand.items[editPostPartProduct.brandId].fullName;
            } else {
                value = editPostPartProduct.brandText;
            }
            items = getFilteredBrandItems(state.brand.items, value);

            break;

        case 'product':
            break;

        case 'color':
            break;
    }

    return {value, items};
}

const mapDispatchToProps: ActionProps = {

};

const ConnectedPostEditPartProductDropDown =
    connect(mapStateToProps, mapDispatchToProps)(PostEditPartProductDropDown);

export default ConnectedPostEditPartProductDropDown;
