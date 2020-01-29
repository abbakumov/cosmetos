import {Component} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';

import PostBarSwitcher from '../PostBarSwitcher';

const styles = require('./styles.styl');

export interface PostBarPublicProps {
    id: PostId;
}

interface PostBarProps {
    id: PostId
    instaPostId: string
    isAbleToEdit: boolean
}

class PostBar extends Component<PostBarProps> {
    render() {
        const {id, instaPostId, isAbleToEdit} = this.props;
        const instaUrl = instaPostId ? 'https://www.instagram.com/p/' + instaPostId : '';

        return (
            <div className={styles.root}>
                {isAbleToEdit &&
                    <Link href="/post/[id]/edit" as={`/post/${id}/edit`}>
                        <a className={styles.editButton}>
                            <img
                                className={styles.editButtonIcon}
                                src="/static/icons/post-page/edit-button.svg"
                            />
                        </a>
                    </Link>
                }
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

    const {currentLogin} = state.blog;
    const {authorLogin} = state.postBase.items[id];
    const {instaPostId} = state.postExtra.items[id];

    const isAbleToEdit = currentLogin === authorLogin;

    return {
        id,
        instaPostId,
        isAbleToEdit,
    };
}

const ConnectedPostBar = connect(mapStateToProps)(PostBar);

export default ConnectedPostBar;