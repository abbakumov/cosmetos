import _ from 'lodash';
import {NextPage} from 'next';

import AdminBrandsPage, {AdminBrandsPagePublicProps} from '../../../components/pages/admin/brands';
import {ICosPageContext} from '../../../types/context';

// import {brandsDataFetchedAction} from '../../entities/Brand/actions';

// import {getAdminBrands} from '../../../entities/ProductBase/api';

const AdminBrandsPageWrapper: NextPage<AdminBrandsPagePublicProps> = (props) => (<AdminBrandsPage {...props} />);

interface InitialProps extends AdminBrandsPagePublicProps {
    title: string;
}

AdminBrandsPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {store} = context;

    // const data = await getAdminProducts();

    // store.dispatch(blogDataFetchedAction(data.blog));

    let title = 'Brands – Cosmetos Admin';

    return {
        title
    };
};

export default AdminBrandsPageWrapper;
