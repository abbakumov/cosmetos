import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import CssBaseLine from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import {AppState} from '../../../store';
import DesktopLayout from '../../layouts/DesktopLayout';

import PostEditPhoto from './components/PostEditPhoto';
import PostEditInfo from './components/PostEditInfo';
import PostEditParts from './components/PostEditParts';

const styles = require('./styles.styl');

interface Props {
    pageTitle: string;
} 

const PostEditPage: FunctionComponent<Props> = (props: Props) => (
    <DesktopLayout>
        <CssBaseLine />
        <AppBar>
            <Toolbar>
                <Typography
                    variant="h6"
                    color="inherit"
                    align="center"
                    className={styles.header}
                    noWrap
                >
                    {props.pageTitle}
                </Typography>
            </Toolbar>
        </AppBar>
        <div className={styles.content}>
            <div className={styles.left}>
                <PostEditPhoto />
                <PostEditInfo />
            </div>
            <div className={styles.right}>
                <PostEditParts />
            </div>
        </div>
    </DesktopLayout>
);

function mapStateToProps(state: AppState) {
    const {id, title} = state.pagePostEdit.postEdit;

    let pageTitle = 'Новый пост';

    if (id) {
        pageTitle = `Редактирование поста "${title}"`;
    }

    return {pageTitle};
}

const ConnectedPostEditPage = connect(mapStateToProps)(PostEditPage);

export default ConnectedPostEditPage;
