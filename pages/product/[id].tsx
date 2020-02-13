import _ from 'lodash';
import {NextPage} from 'next';

import ProductPage, {ProductPagePublicProps} from '../../components/pages/product';
import {ICosPageContext} from '../../types/context';
import {PostId} from '../../entities/Post/types';

import {pageProductDataFetchedAction} from '../../components/pages/product/state/actions';
import {getProductById} from '../../entities/ProductBase/api';
import {blogsDataFetchedAction} from '../../entities/Blog/actions';
import {blogProductsDataFetchedAction} from '../../entities/BlogProduct/actions';
import {postProductsDataFetchedAction} from '../../entities/PostProduct/actions';
import {postsBaseDataFetchedAction} from '../../entities/Post/actions';
import {productBaseDataFetchedAction} from '../../entities/ProductBase/actions';
import {productColorsDataFetchedAction} from '../../entities/ProductColor/actions';
import {productExtraDataFetchedAction} from '../../entities/ProductExtra/actions';

const ProductPageWrapper: NextPage<ProductPagePublicProps> = (props) => (<ProductPage {...props} />);

interface InitialProps extends ProductPagePublicProps {
    title: string;
}

ProductPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {query, store} = context;
    const {
        id: queryId,
        refPost: queryRefPost,
    } = query;
    const id = parseInt(_.castArray(queryId)[0]);
    const refPost = parseInt(_.castArray(queryRefPost)[0]) as PostId;

    const data = await getProductById(id, context);

    store.dispatch(pageProductDataFetchedAction(id, refPost));
    store.dispatch(blogsDataFetchedAction(data.blog.data, data.blog.currentLogin));
    store.dispatch(blogProductsDataFetchedAction(data.blogProduct));
    store.dispatch(postProductsDataFetchedAction(data.postProduct));
    store.dispatch(postsBaseDataFetchedAction(data.postBase));
    store.dispatch(productBaseDataFetchedAction(data.productBase));
    store.dispatch(productColorsDataFetchedAction(data.productColor));
    store.dispatch(productExtraDataFetchedAction(data.productExtra));

    let title = 'Cosmetos';

    const productTitle = data.productBase && data.productBase.title;
    if (typeof productTitle !== 'undefined') {
        title = `${productTitle} – Cosmetos`;
    }

    return {id, title};
};

export default ProductPageWrapper;
