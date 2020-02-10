import _ from 'lodash';
import {NextPage} from 'next';
import {batchActions} from 'redux-batched-actions';

import PostPage, {PostPagePublicProps} from '../../../components/pages/post';
import {ICosPageContext} from '../../../types/context';

import {postPageDataFetchedAction} from '../../../components/pages/post/state/actions';
import {blogsDataFetchedAction} from '../../../entities/Blog/actions';
import {postBaseDataFetchedAction} from '../../../entities/Post/actions';
import {postExtraDataFetchedAction} from '../../../entities/PostExtra/actions';
import {postPartsDataFetchedAction} from '../../../entities/PostPart/actions';
import {postPartProductsDataFetchedAction} from '../../../entities/PostPartProduct/actions';
import {productColorsDataFetchedAction} from '../../../entities/ProductColor/actions';
import {productsBaseDataFetchedAction} from '../../../entities/ProductBase/actions';
import {blogProductsDataFetchedAction} from '../../../entities/BlogProduct/actions';

import {getPostById} from '../../../entities/Post/api';

const PostPageWrapper: NextPage<PostPagePublicProps> = (props) => (<PostPage {...props} />);

interface InitialProps extends PostPagePublicProps {
    title: string;
}

PostPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {query, store} = context;
    const queryId = query.id;
    const id = parseInt(_.castArray(queryId)[0]);

    const data = await getPostById(id, context);

    store.dispatch(batchActions([
        postPageDataFetchedAction(data.postBase.id),
        blogsDataFetchedAction(data.blog.data, data.blog.currentLogin),
        postBaseDataFetchedAction(data.postBase),
        postExtraDataFetchedAction(data.postExtra),
        postPartsDataFetchedAction(data.postPart),
        productColorsDataFetchedAction(data.productColor),
        postPartProductsDataFetchedAction(data.postPartProduct),
        productsBaseDataFetchedAction(data.productBase),
        blogProductsDataFetchedAction(data.blogProduct),
    ]));

    let title = 'Cosmetos';

    const postTitle = data.postBase && data.postBase.title;
    if (typeof postTitle !== 'undefined') {
        title = `${postTitle} – Cosmetos`;
    }

    return {id, title};
};

export default PostPageWrapper;
