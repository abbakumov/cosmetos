import _ from 'lodash';
import {NextPage} from 'next';

import AdminBrandsPage, {AdminBrandsPagePublicProps} from '../../../components/pages/admin/brands';
import {pageAdminBrandsFetchSuccessAction} from '../../../components/pages/admin/brands/store/actions';

import {ICosPageContext} from '../../../types/context';

import {brandsDataFetchedAction} from '../../../entities/Brand/actions';

import {getAdminBrands} from '../../../entities/Brand/api';

const AdminBrandsPageWrapper: NextPage<AdminBrandsPagePublicProps> = (props) => (<AdminBrandsPage {...props} />);

interface InitialProps extends AdminBrandsPagePublicProps {
    title: string;
}

AdminBrandsPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {store} = context;

    const data = await getAdminBrands({}, context);

    store.dispatch(brandsDataFetchedAction(data.brand));
    store.dispatch(pageAdminBrandsFetchSuccessAction(data.ids));

    let title = 'Brands – Cosmetos Admin';

    return {title};
};

export default AdminBrandsPageWrapper;
