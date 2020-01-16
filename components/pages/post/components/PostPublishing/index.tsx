import {Component} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';

const styles = require('./styles.styl');

export interface PostPublishingPublicProps {
    id: PostId;
}

interface PostPublishingProps {
    isPublic: boolean;
}

class PostPublishing extends Component<PostPublishingProps> {
    state = {
        isStartsPublic: this.props.isPublic,
        isPublic: this.props.isPublic,
    };

    onPublishClick = () => {
        setTimeout(
            () => {
                this.setState({
                    isPublic: true,
                })
            },
            400
        )
    };

    render() {
        if (this.state.isStartsPublic) {
            // if post is public when first rendered
            // then never show this component
            return null;
        }

        const contentClassName = cn(
            styles.content,
            {
                [styles.contentPublic]: this.state.isPublic,
            }
        );

        return (
            <div className={styles.root}>
                <div className={contentClassName}>
                    <div className={styles.notPublicLine}>
                        <img
                            className={styles.notPublicIcon}
                            src="/static/icons/post-page/not-public.svg"
                        />
                        <span className={styles.notPublicText}>Не опубликовано</span>
                        <button
                            className={styles.publishButton}
                            onClick={this.onPublishClick}
                        >
                            Опубликовать
                        </button>
                    </div>
                    <div className={styles.publicLine}>
                        <img className={styles.publicIcon} src="/static/icons/post-page/published.svg" />
                        <span className={styles.publicText}>Пост опубликован</span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: AppState, ownProps: PostPublishingPublicProps): PostPublishingProps {
    const {id} = ownProps;

    const postBase = state.postBase.items[id];
    const {isPublic} = postBase;

    return {
        isPublic,
    };
}

const ConnectedPostPublishing = connect(mapStateToProps)(PostPublishing);

export default ConnectedPostPublishing;