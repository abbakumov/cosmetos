import {connect} from 'react-redux';
import _ from 'lodash';
import {NextPage} from 'next';

import LoginPage, {LoginPagePublicProps} from '../components/pages/login';
import {ICosPageContext} from '../types/context';

const LoginPageWrapper: NextPage<LoginPagePublicProps> = (props) => (<LoginPage {...props} />);

LoginPageWrapper.getInitialProps = async function(context: ICosPageContext): Promise<LoginPagePublicProps> {
    const {} = context;

    return {};
};

export default LoginPageWrapper;
