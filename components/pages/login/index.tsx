import React, {Component} from 'react';

import LoginForm from './components/LoginForm';
import NotificationMaterial from '../../widgets/NotificationMaterial';
import DesktopLayout from '../../layouts/DesktopLayout';

const styles = require('./styles.styl');

export interface LoginPagePublicProps {
};

interface LoginPageProps {

}

class LoginPage extends Component<LoginPageProps> {
    render() {
        return (
            <DesktopLayout>
                <div className={styles.root}>
                    <div className={styles.logoContainer}>
                        <img className={styles.logo} src="/static/icons/header-logo.png" />
                    </div>
                    <div className={styles.content}>
                        <LoginForm />
                        <div className={styles.registerText}>
                            <div className={styles.textTop}>
                                Если ты блогер и&nbsp;хочешь
                                <br />
                                зарегестрироваться
                                <br />
                                напиши нам на почту
                            </div>
                            <div className={styles.mail}>hello.cosmetos@gmail.com</div>
                        </div>
                    </div>
                    <NotificationMaterial />
                </div>
            </DesktopLayout>
        );
    }
}

export default LoginPage;