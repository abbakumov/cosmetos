import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';

const styles = require('./styles.styl');

export interface PostInfoPublicProps {
    id: PostId
}

interface PostInfoProps {
    title: string;
    description: string;
}

class PostInfo extends Component<PostInfoProps> {
    render() {
        const {title, description} = this.props;

        return (
            <div className={styles.root}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <p className={styles.description}>
                    {description}
                </p>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostInfoPublicProps): PostInfoProps {
    const {id} = ownProps;

    const postBase = state.postBase.items[id];
    const postExtra = state.postExtra.items[id];

    return {
        title: postBase.title,
        description: postExtra.description,
    };
}

const ConnectedPostInfo = connect(mapStateToProps)(PostInfo);

export default ConnectedPostInfo;