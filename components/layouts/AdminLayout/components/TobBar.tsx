import {FunctionComponent} from 'react';
import {useRouter} from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const styles = require('../styles.styl');

const TopBar: FunctionComponent = () => {
    const {route} = useRouter();

    let title = 'No title';

    if (route === '/admin/brand') {
        title = 'Бренды';
    }

    if (route === '/admin/product') {
        title = 'Продукты';
    }

    return (
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
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
