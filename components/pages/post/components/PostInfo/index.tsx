import {Component} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/PostBase/types';

const styles = require('./styles.styl');

export interface PostInfoPublicProps {
    id: PostId
}

interface PostInfoProps {
    description: string;
}

class PostInfo extends Component<PostInfoProps> {
    render() {
        const {description} = this.props;

        return (
            <div className={styles.root}>
                <p className={styles.description}>
                    {description}
                </p>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostInfoPublicProps): PostInfoProps {
    const {id} = ownProps;

    const postExtra = state.postExtra.items[id];

    const {description} = postExtra;

    return {
        description,
    };
}

const ConnectedPostInfo = connect(mapStateToProps)(PostInfo);

export default ConnectedPostInfo;