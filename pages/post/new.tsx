import {connect} from 'react-redux';
import _ from 'lodash';
import {NextPage} from 'next';

import PostEditPage from '../../components/pages/post-edit';
import {ICosPageContext} from '../../types/context';

// import {blogDataFetchedAction} from '../../entities/Blog/actions';

// import {getPostEditById} from '../../entities/PostBase/api';

const PostEditPageWrapper: NextPage<{}> = (props) => (<PostEditPage {...props} />);

interface InitialProps {
    title: string;
}

PostEditPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {query, store} = context;
    const queryId = query.id;
    const id = parseInt(_.castArray(queryId)[0]);

    const data = {} // await getPostEditById(id);

    // store.dispatch(blogDataFetchedAction(data.blog));

    let title = 'Новый пост – Cosmetos';

    // const postTitle = data.postBase && data.postBase.title;
    // if (typeof postTitle !== 'undefined') {
    //     title = `${postTitle} – Cosmetos`;
    // }

    return {title};
};

export default PostEditPageWrapper;
