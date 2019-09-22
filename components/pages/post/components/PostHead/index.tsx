import {FunctionComponent} from 'react';
import Link from 'next/link';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/PostBase/types';

const styles = require('./styles.styl');

interface PostHeadProps {
    id: PostId;
}

interface Props {
    title: string;
    authorLogin: string;
}

const PostHead: FunctionComponent<Props> = ({title, authorLogin}: Props) => (
    <Link href="/blog/[name]" as={`/blog/${authorLogin}`}>
        <a className={styles.root}>
            <img className={styles.icon} src="/static/icons/post-page/blog-arr.svg" />
            <span className={styles.name}>{title}</span>
        </a>
    </Link>
);

function mapStateToProps(state: AppState, ownProps: PostHeadProps) {
    const {id} = ownProps;

    const {authorLogin} = state.postBase.items[id];
    const title = state.blog.items[authorLogin].name;

    return {
        title,
        authorLogin,
    };
}

const ConnectedPostHead = connect(mapStateToProps)(PostHead);

export default ConnectedPostHead;
