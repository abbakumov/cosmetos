import _ from 'lodash';
import {NextPage} from 'next';

import AdminProductPage, {AdminProductPageProps} from '../../../components/pages/admin/product';
import {ICosPageContext} from '../../../types/context';

// import {productBaseDataFetchedAction} from '../../entities/ProductBase/actions';

import {getAdminProductById} from '../../../entities/ProductBase/api';
import {pageAdminProductDataFetchedAction} from '../../../components/pages/admin/product/store/actions';
import {brandsDataFetchedAction} from '../../../entities/Brand/actions';
import {productColorsDataFetchedAction} from '../../../entities/ProductColor/actions';

const AdminProductPageWrapper: NextPage<AdminProductPageProps> = (props) => (<AdminProductPage {...props} />);

interface InitialProps extends AdminProductPageProps {
    title: string;
}

AdminProductPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {query, store} = context;

    const productId = parseInt(_.castArray(query.id)[0]);
    const data = await getAdminProductById(productId);

    store.dispatch(pageAdminProductDataFetchedAction(data.product, data.brandIds));
    store.dispatch(brandsDataFetchedAction(data.brand));
    store.dispatch(productColorsDataFetchedAction(data.productColor));

    let title = 'Product – Cosmetos Admin';

    return {
        id: productId,
        title
    };
};

export default AdminProductPageWrapper;
