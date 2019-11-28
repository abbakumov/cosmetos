import _ from 'lodash';
import {NextPage} from 'next';

import PostEditPage from '../../../components/pages/post-edit';
import {ICosPageContext} from '../../../types/context';

import {postEditDataFetchedAction} from '../../../components/pages/post-edit/store/actions';
// import {blogDataFetchedAction} from '../../entities/Blog/actions';

import {getPostEditById} from '../../../entities/PostEdit/api';
import {postPartsDataFetchedAction} from '../../../entities/PostPart/actions';
import {productsBaseDataFetchedAction} from '../../../entities/ProductBase/actions';
import {productsExtraDataFetchedAction} from '../../../entities/ProductExtra/actions';
import {productColorsDataFetchedAction} from '../../../entities/ProductColor/actions';
import {postProductsDataFetchedAction} from '../../../entities/PostProduct/actions';
import {brandsDataFetchedAction} from '../../../entities/Brand/actions';

const PostEditPageWrapper: NextPage<{}> = (props) => (<PostEditPage {...props} />);

interface InitialProps {
    title: string;
}

PostEditPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {query, store} = context;
    const queryId = query.id;
    const id = parseInt(_.castArray(queryId)[0]);

    const data = await getPostEditById(id, context);

    store.dispatch(postEditDataFetchedAction({
        postEdit: data.postEdit,
        postPartIds: data.postPartIds,
    }));
    store.dispatch(postPartsDataFetchedAction(data.postPart));
    store.dispatch(productsBaseDataFetchedAction(data.productBase));
    store.dispatch(productsExtraDataFetchedAction(data.productExtra));
    store.dispatch(productColorsDataFetchedAction(data.productColor));
    store.dispatch(postProductsDataFetchedAction(data.postProduct));
    store.dispatch(brandsDataFetchedAction(data.brand));

    let title = 'Редактирование поста – Cosmetos';

    // const postTitle = data.postBase && data.postBase.title;
    // if (typeof postTitle !== 'undefined') {
    //     title = `${postTitle} – Cosmetos`;
    // }

    return {title};
};

export default PostEditPageWrapper;
