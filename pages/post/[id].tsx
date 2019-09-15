import {connect} from 'react-redux';
import {NextPage} from 'next';

import PostPage, {PostPagePublicProps} from '../../components/pages/post';
import {ICosPageContext} from '../../types/context';

const PostPageWrapper: NextPage<PostPagePublicProps> = (props) => (<PostPage {...props} />);

PostPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<PostPagePublicProps> {
    const {query, store} = context;

    // dispatch:

    // post base
    // post extra
    // product base
    // blog product

    return {
        id: 0,
    };
};

export default PostPageWrapper;
