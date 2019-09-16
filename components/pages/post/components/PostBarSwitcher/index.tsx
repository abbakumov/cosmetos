import {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/PostBase/types';
import {postPageToggleIsPicPartsOpenAction} from '../../state/actions';

const styles = require('./styles.styl');

export interface PostBarSwitcherPublicProps {}

interface PostBarSwitcherMappedProps {
    isActive: boolean;
}

interface PostBarSwitcherConnectedActions {
    toggleAction(): void;
}

interface PostBarSwitcherProps extends PostBarSwitcherMappedProps, PostBarSwitcherConnectedActions {}

class PostBarSwitcher extends Component<PostBarSwitcherProps> {
    render() {
        const {isActive, toggleAction} = this.props;

        const tumblerClassName = isActive
            ? `${styles.tumbler} ${styles.tumblerActive}`
            : styles.tumbler;

        return (
            <div className={styles.root} onClick={toggleAction}>
                <div className={styles.container}>
                    <div className={tumblerClassName} />
                </div>
                <div className={styles.leftIcon} />
                <div className={styles.rightIcon} />
            </div>
        );
    }
}

function mapStateToProps(state: AppState): PostBarSwitcherMappedProps {
    return {
        isActive: state.pagePost.isPicPartsOpen,
    };
}

const mapDispatchToProps: PostBarSwitcherConnectedActions = {
    toggleAction: postPageToggleIsPicPartsOpenAction,
};

const ConnectedPostBarSwitcher = connect(mapStateToProps, mapDispatchToProps)(PostBarSwitcher);

export default ConnectedPostBarSwitcher;