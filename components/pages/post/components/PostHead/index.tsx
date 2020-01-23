import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import {AppState} from '../../../../../store';
import {PostId} from '../../../../../entities/Post/types';
import BackLink from '../../../../widgets/BackLink';

interface PostHeadProps {
    id: PostId;
}

interface Props {
    title: string;
    authorLogin: string;
}

const PostHead: FunctionComponent<Props> = ({title, authorLogin}: Props) => (
    <BackLink href="/blog/[name]" as={`/blog/${authorLogin}`}>
        {title}
    </BackLink>
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
