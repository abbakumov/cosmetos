import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppState} from '../../../store';
import {PostId} from '../../../entities/PostBase/types';

import PostsListPost from './Post';

const styles = require('./styles.styl');

export interface PostsListPublicProps {
    title: string;
    postIds: PostId[];
    namesVisible: boolean;
}

class PostsList extends Component<PostsListPublicProps> {
    render() {
        const {title, postIds, namesVisible} = this.props;

        return (
            <div className={styles.root}>
                <div className={styles.title}>{title}:</div>
                <div className={styles.container}>
                    {postIds.map(id => (
                        <PostsListPost
                            key={id}
                            id={id}
                            nameVisible={namesVisible}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

export default PostsList;
