import _ from 'lodash';
import {NextPage} from 'next';

import ProductPage, {ProductPagePublicProps} from '../../components/pages/product';
import {ICosPageContext} from '../../types/context';

// import {blogDataFetchedAction} from '../../entities/Blog/actions';

import {getProductById} from '../../entities/ProductBase/api';

const ProductPageWrapper: NextPage<ProductPagePublicProps> = (props) => (<ProductPage {...props} />);

ProductPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<ProductPagePublicProps> {
    const {query, store} = context;
    const queryId = query.id;
    const id = parseInt(_.castArray(queryId)[0]);

    const data = await getProductById(id);

    // store.dispatch(blogDataFetchedAction(data.blog));

    return {id};
};

export default ProductPageWrapper;
