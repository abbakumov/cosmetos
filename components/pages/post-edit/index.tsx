import {FunctionComponent} from 'react';

import CssBaseLine from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

import DesktopLayout from '../../layouts/DesktopLayout';

import PostEditPhoto from './components/PostEditPhoto';
import PostEditInfo from './components/PostEditInfo';
import PostEditParts from './components/PostEditParts';

const styles = require('./styles.styl');

const PostEditPage: FunctionComponent = () => (
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
                    Новый пост
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

export default PostEditPage;
