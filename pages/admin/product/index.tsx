import _ from 'lodash';
import {NextPage} from 'next';

import AdminProductsPage, {AdminProductsPagePublicProps} from '../../../components/pages/admin/products';
import {ICosPageContext} from '../../../types/context';

import {productsBaseDataFetchedAction} from '../../../entities/ProductBase/actions';

import {pageAdminProductsFetchSuccessAction} from '../../../components/pages/admin/products/store/actions';
import {getAdminProducts} from '../../../entities/ProductBase/api';

const AdminProductsPageWrapper: NextPage<AdminProductsPagePublicProps> = (props) => (<AdminProductsPage {...props} />);

interface InitialProps extends AdminProductsPagePublicProps {
    title: string;
}

AdminProductsPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {store} = context;

    const data = await getAdminProducts({}, context);

    store.dispatch(pageAdminProductsFetchSuccessAction(data.total, data.ids));
    store.dispatch(productsBaseDataFetchedAction(data.product));

    let title = 'Products – Cosmetos Admin';

    return {title};
};

export default AdminProductsPageWrapper;
