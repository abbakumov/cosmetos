import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';

import PostBarSwitcher from '../PostBarSwitcher';

const styles = require('./styles.styl');

export interface PostBarPublicProps {
    id: PostId;
}

interface PostBarProps {
    instaPostId: string
}

class PostBar extends Component<PostBarProps> {
    render() {
        const {instaPostId} = this.props;
        const instaUrl = instaPostId ? 'https://www.instagram.com/p/' + instaPostId : '';

        return (
            <div className={styles.root}>
                <PostBarSwitcher />
                <a className={styles.instaLink} target="_blank" href={instaUrl}>
                    Instagram
                </a>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostBarPublicProps): PostBarProps {
    const {id} = ownProps;

    const postExtra = state.postExtra.items[id];

    const {instaPostId} = postExtra;

    return {
        instaPostId,
    };
}

const ConnectedPostBar = connect(mapStateToProps)(PostBar);

export default ConnectedPostBar;