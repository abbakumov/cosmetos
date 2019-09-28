import {FunctionComponent} from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const styles = require('../styles.styl');

const TopBar: FunctionComponent = () => (
    <AppBar
        className={styles.header}
    >
        <Toolbar
            className={styles.headerToolbar}
        >
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
            >
                Продукты
            </Typography>
        </Toolbar>
    </AppBar>
);

export default TopBar;
