import {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

const styles = require('./styles.styl');

export interface SuggestItem {
    id?: number;
    value: string;
}

export interface DataProps {
    inputValue: string
    items: SuggestItem[]
    label: string
    isActive: boolean
}

export interface ActionProps {
    fieldChange(value: string | number): void
    fieldTextChange(value: string): void
}

interface Props extends DataProps, ActionProps {}

interface State {
    isOpen: boolean
}

class MaterialDropDown extends Component<Props, State> {
    state = {
        isOpen: false,
    };

    onChange = (item) => {
        this.props.fieldChange(item.id);
    }

    onInputValueChange = (event) => {
        const {value} = event.target;

        // точно ли нужно?
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
                        value={this.props.inputValue}
                        onChange={this.onInputValueChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                    />
                    {this.state.isOpen &&
                        <Paper className={styles.suggest}>
                            {this.props.items
                                .map((item) => (
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

export default MaterialDropDown;
