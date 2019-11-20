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
    let title = 'Новый пост – Cosmetos';

    return {title};
};

export default PostEditPageWrapper;
