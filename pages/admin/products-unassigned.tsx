import _ from 'lodash';
import {NextPage} from 'next';

import AdminProductsUnassignedPage, {
    AdminProductsUnassignedPageProps
} from '../../components/pages/admin/products-unassigned';
import {ICosPageContext} from '../../types/context';

import {getAdminUnProducts} from '../../entities/UnProduct/api';

import {unProductsDataFetchedAction} from '../../entities/UnProduct/actions';
import {brandsDataFetchedAction} from '../../entities/Brand/actions';
import {productsBaseDataFetchedAction} from '../../entities/ProductBase/actions';

const AdminProductsUnassignedPageWrapper: NextPage<AdminProductsUnassignedPageProps>
    = (props) => (<AdminProductsUnassignedPage {...props} />);

interface InitialProps extends AdminProductsUnassignedPageProps {
    title: string;
}

AdminProductsUnassignedPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {store} = context;

    const data = await getAdminUnProducts();
    store.dispatch(unProductsDataFetchedAction(data.unProduct));
    store.dispatch(brandsDataFetchedAction(data.brand));
    store.dispatch(productsBaseDataFetchedAction(data.productBase));

    let title = 'Вольные продукты – Cosmetos Admin';

    return {
        productIds: [],
        title
    };
};

export default AdminProductsUnassignedPageWrapper;
