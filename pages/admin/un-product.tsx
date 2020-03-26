import _ from 'lodash';
import {NextPage} from 'next';

import AdminProductsUnassignedPage from '../../components/pages/admin/products-unassigned';
import {ICosPageContext} from '../../types/context';

import {UnProductId} from '../../entities/UnProduct/types';

import {getAdminUnProducts} from '../../entities/UnProduct/api';

import {pageAdminUnProductsDataFetchedAction} from '../../components/pages/admin/products-unassigned/state/actions';
import {unProductsDataFetchedAction} from '../../entities/UnProduct/actions';
import {brandsDataFetchedAction} from '../../entities/Brand/actions';
import {productsBaseDataFetchedAction} from '../../entities/ProductBase/actions';

const AdminProductsUnassignedPageWrapper: NextPage<{}>
    = (props) => (<AdminProductsUnassignedPage {...props} />);

interface InitialProps {
    title: string;
}

AdminProductsUnassignedPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {store} = context;

    const data = await getAdminUnProducts(context);

    const unProductIds: UnProductId[] = Object.keys(data.unProduct).map(id => parseInt(id));

    store.dispatch(pageAdminUnProductsDataFetchedAction(unProductIds));

    store.dispatch(unProductsDataFetchedAction(data.unProduct));
    store.dispatch(brandsDataFetchedAction(data.brand));
    store.dispatch(productsBaseDataFetchedAction(data.productBase));

    const title = 'Вольные продукты – Cosmetos Admin';

    return {title};
};

export default AdminProductsUnassignedPageWrapper;
