import React, {Component} from 'react';
import {connect} from 'react-redux';

import {pageLoginUpdateValue} from '../../state/actions';
import { AppState } from '../../../../../store';

const styles = require('./styles.styl');

interface LoginFormMappedProps {
    login: string;
    password: string;
}

interface LoginFormConnectedActions {
    pageLoginUpdateValue(name: string, value: string): void;
}

interface LoginFormProps extends LoginFormMappedProps, LoginFormConnectedActions {}

class LoginForm extends Component<LoginFormProps> {
    fieldValueChanged = (event) => this.props.pageLoginUpdateValue(event.target.name, event.target.value);

    render() {
        const {login, password} = this.props;

        return (
            <div className={styles.root}>
                <input
                    id="login"
                    name="login"
                    placeholder="Логин"
                    className={styles.input}
                    value={login}
                    onChange={this.fieldValueChanged}
                />
                <input
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    className={styles.input}
                    value={password}
                    onChange={this.fieldValueChanged}
                    type="password"
                />
                <button className={styles.button}>Войти</button>
            </div>
        )
    }
}

function mapStateToProps(state: AppState): LoginFormMappedProps {
    const {login, password} = state.pageLogin;

    return {
        login,
        password,
    };
}

const mapDispatchToProps = {
    pageLoginUpdateValue,
};

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default ConnectedLoginForm;