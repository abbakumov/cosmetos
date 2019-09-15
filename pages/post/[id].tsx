import {connect} from 'react-redux';
import _ from 'lodash';
import {NextPage} from 'next';

import PostPage, {PostPagePublicProps} from '../../components/pages/post';
import {ICosPageContext} from '../../types/context';

import {blogDataFetchedAction} from '../../entities/Blog/actions';
import {postBaseDataFetchedAction} from '../../entities/PostBase/actions';
import {postExtraDataFetchedAction} from '../../entities/PostExtra/actions';
import {postPartsDataFetchedAction} from '../../entities/PostPart/actions';
import {productsBaseDataFetchedAction} from '../../entities/ProductBase/actions';
import {blogProductsDataFetchedAction} from '../../entities/BlogProduct/actions';

import {getPostById} from '../../entities/PostBase/api';

const PostPageWrapper: NextPage<PostPagePublicProps> = (props) => (<PostPage {...props} />);

PostPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<PostPagePublicProps> {
    const {query, store} = context;
    const {id} = query;

    const data = await getPostById(parseInt(_.castArray(id)[0]));

    store.dispatch(blogDataFetchedAction(data.blog));
    store.dispatch(postBaseDataFetchedAction(data.postBase));
    store.dispatch(postExtraDataFetchedAction(data.postExtra));
    store.dispatch(postPartsDataFetchedAction(data.postPart));
    store.dispatch(productsBaseDataFetchedAction(data.productBase));
    store.dispatch(blogProductsDataFetchedAction(data.blogProduct));

    return {
        id: 0,
    };
};

export default PostPageWrapper;
