import {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import Downshift from 'downshift';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import {AppState} from '../../../../../store';

const styles = require('./styles.styl');

export interface PostEditPartProductDropDownProps {

}

interface MappedProps {

}

interface ActionProps {

}

interface Props extends MappedProps, ActionProps {

}

const items = [
    {value: 'apple'},
    {value: 'orange'},
    {value: 'banana'},
];

const PostEditPartProductDropDown: FunctionComponent = () => (
    <div className={styles.root}>
        <Downshift
            onChange={value => {
                console.log('downshift change, value: ', value);
            }}
            // inputValue={'kek'}
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
                                {items
                                    .filter(item => !inputValue || item.value.includes(inputValue))
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

function mapStateToProps(state: AppState, ownProps: PostEditPartProductDropDownProps): MappedProps {
    return {

    };
}

const mapDispatchToProps: ActionProps = {

};

const ConnectedPostEditPartProductDropDown =
    connect(mapStateToProps, mapDispatchToProps)(PostEditPartProductDropDown);

export default ConnectedPostEditPartProductDropDown;
