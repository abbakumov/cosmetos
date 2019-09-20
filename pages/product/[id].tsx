import _ from 'lodash';
import {NextPage} from 'next';

import ProductPage, {ProductPagePublicProps} from '../../components/pages/product';
import {ICosPageContext} from '../../types/context';

// import {blogDataFetchedAction} from '../../entities/Blog/actions';

import {getProductById} from '../../entities/ProductBase/api';
import {blogsDataFetchedAction} from '../../entities/Blog/actions';
import {blogProductsDataFetchedAction} from '../../entities/BlogProduct/actions';
import {postsBaseDataFetchedAction} from '../../entities/PostBase/actions';
import {productBaseDataFetchedAction} from '../../entities/ProductBase/actions';
import {productColorsDataFetchedAction} from '../../entities/ProductColor/actions';
import {productExtraDataFetchedAction} from '../../entities/ProductExtra/actions';

const ProductPageWrapper: NextPage<ProductPagePublicProps> = (props) => (<ProductPage {...props} />);

ProductPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<ProductPagePublicProps> {
    const {query, store} = context;
    const queryId = query.id;
    const id = parseInt(_.castArray(queryId)[0]);

    const data = await getProductById(id);

    store.dispatch(blogsDataFetchedAction(data.blog));
    store.dispatch(blogProductsDataFetchedAction(data.blogProduct));
    store.dispatch(postsBaseDataFetchedAction(data.postBase));
    store.dispatch(productBaseDataFetchedAction(data.productBase));
    store.dispatch(productColorsDataFetchedAction(data.productColor));
    store.dispatch(productExtraDataFetchedAction(data.productExtra));

    return {id};
};

export default ProductPageWrapper;