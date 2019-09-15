import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/PostBase/types';

const styles = require('./styles.styl');

export interface PostBarSwitcherPublicProps {
}

interface PostBarSwitcherProps {
    isActive: boolean;
}

class PostBarSwitcher extends Component<PostBarSwitcherProps> {
    render() {
        return (
            <div className={styles.root}>
                <div className={styles.container}>
                    <div className={styles.tumbler} />
                </div>
                <div className={styles.leftIcon} />
                <div className={styles.rightIcon} />
            </div>
        );
    }
}

function mapStateToProps(state: AppState): PostBarSwitcherProps {


    return {
        isActive: false,
    };
}

const ConnectedPostBarSwitcher = connect(mapStateToProps)(PostBarSwitcher);

export default ConnectedPostBarSwitcher;