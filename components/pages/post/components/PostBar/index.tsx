import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/PostBase/types';

import PostBarSwitcher from '../PostBarSwitcher';

const styles = require('./styles.styl');

export interface PostBarPublicProps {
    id: PostId;
}

interface PostBarProps {
    instaUrl: string
}

class PostBar extends Component<PostBarProps> {
    render() {
        const {instaUrl} = this.props;

        return (
            <div className={styles.root}>
                <PostBarSwitcher />
                <a className={styles.instaLink} href={instaUrl}>
                    Instagram
                </a>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostBarPublicProps): PostBarProps {
    const {id} = ownProps;

    const postExtra = state.postExtra.items[id];

    const {instaUrl} = postExtra;

    return {
        instaUrl,
    };
}

const ConnectedPostBar = connect(mapStateToProps)(PostBar);

export default ConnectedPostBar;