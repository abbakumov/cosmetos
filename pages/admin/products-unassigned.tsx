import _ from 'lodash';
import {NextPage} from 'next';

import AdminProductsUnassignedPage, {
    AdminProductsUnassignedPageProps
} from '../../components/pages/admin/products-unassigned';
import {ICosPageContext} from '../../types/context';

// import {productBaseDataFetchedAction} from '../../entities/ProductBase/actions';

import {getAdminProductById} from '../../entities/ProductBase/api';

const AdminProductsUnassignedPageWrapper: NextPage<AdminProductsUnassignedPageProps>
    = (props) => (<AdminProductsUnassignedPage {...props} />);

interface InitialProps extends AdminProductsUnassignedPageProps {
    title: string;
}

AdminProductsUnassignedPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {store} = context;

    // const data = await getAdminProductsUnassigned();
    // store.dispatch(blogDataFetchedAction(data.blog));

    let title = 'Вольные продукты – Cosmetos Admin';

    return {
        productIds: [],
        title
    };
};

export default AdminProductsUnassignedPageWrapper;
