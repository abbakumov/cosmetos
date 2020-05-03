import _ from 'lodash';
import {NextPage} from 'next';

import MainPage, {MainPageProps} from '../components/pages/main';
import {ICosPageContext} from '../types/context';
import {getMain} from '../components/pages/main/api';
import {blogsDataFetchedAction} from '../entities/Blog/actions';
import {blogProductsDataFetchedAction} from '../entities/BlogProduct/actions';
import {productsBaseDataFetchedAction} from '../entities/ProductBase/actions';
import {postsBaseDataFetchedAction} from '../entities/Post/actions';
import {pageMainFetchSuccessAction} from '../components/pages/main/state/actions';

const MainPageWrapper: NextPage<MainPageProps> = (props) => (<MainPage {...props} />);

interface InitialProps extends MainPageProps {
    title: string
}

MainPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<InitialProps> {
    const {store} = context;

    const data = await getMain(context);

    store.dispatch(pageMainFetchSuccessAction(_.pick(data, ['blogLogins', 'blogProductIds', 'postIds'])));
    store.dispatch(blogsDataFetchedAction(data.blog.data, data.blog.currentLogin));
    store.dispatch(productsBaseDataFetchedAction(data.productBase));
    store.dispatch(blogProductsDataFetchedAction(data.blogProduct));
    store.dispatch(postsBaseDataFetchedAction(data.post));

    return {title: 'Cosmetos'};
};

export default MainPageWrapper;
