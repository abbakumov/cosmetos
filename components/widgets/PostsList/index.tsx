import React, {Component} from 'react';
import {PostId} from '../../../entities/Post/types';

import SectionTitle from '../SectionTitle';

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

        if (!postIds || !postIds.length) {
            return null;
        }

        return (
            <div className={styles.root}>
                <SectionTitle>{title}</SectionTitle>
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
