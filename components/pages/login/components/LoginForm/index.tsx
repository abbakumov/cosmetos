import React, {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {
    pageLoginUpdateValue,
    pageLoginEnterAction,
} from '../../state/actions';

const styles = require('./styles.styl');

interface LoginFormMappedProps {
    login: string;
    password: string;
}

interface LoginFormConnectedActions {
    pageLoginUpdateValue(name: string, value: string): void;
    enterAction(): void;
}

interface LoginFormProps extends LoginFormMappedProps, LoginFormConnectedActions {}

class LoginForm extends Component<LoginFormProps> {
    fieldValueChanged = (event) => this.props.pageLoginUpdateValue(event.target.name, event.target.value);
    enterAction = () => this.props.enterAction();

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
                <button
                    className={styles.button}
                    onClick={this.enterAction}
                >
                    Войти
                </button>
            </div>
        )
    }
}

function mapStateToProps(state: AppState): LoginFormMappedProps {
    const {login, password} = state.pageLogin;

    return {login, password};
}

const mapDispatchToProps = {
    pageLoginUpdateValue,
    enterAction: pageLoginEnterAction,
};

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default ConnectedLoginForm;