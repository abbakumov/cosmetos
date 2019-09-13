import React, {Component} from 'react';

const styles = require('./styles.styl');

export interface MobileLayoutPublicProps {}

export default class MobileLayout extends Component<MobileLayoutPublicProps> {
    render() {
        return (
            <div>
                <div className={styles.header}>
                    <img className={styles.logo} src="/static/icons/header-logo.png"/>
                </div>
                <div className={styles.content}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
