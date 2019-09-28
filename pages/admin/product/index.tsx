import _ from 'lodash';
import {NextPage} from 'next';

import AdminProductsPage, {AdminProductsPagePublicProps} from '../../../components/pages/admin/products';
import {ICosPageContext} from '../../../types/context';

// import {productsBaseDataFetchedAction} from '../../entities/ProductBase/actions';

import {getAdminProducts} from '../../../entities/ProductBase/api';

const AdminProductsPageWrapper: NextPage<AdminProductsPagePublicProps> = (props) => (<AdminProductsPage {...props} />);

interface InitialProps extends AdminProductsPagePublicProps {
    title: string;
}

AdminProductsPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {store} = context;

    const data = await getAdminProducts();

    // store.dispatch(blogDataFetchedAction(data.blog));

    let title = 'Products – Cosmetos Admin';

    return {
        productIds: [],
        title
    };
};

export default AdminProductsPageWrapper;
