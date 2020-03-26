import {FunctionComponent} from 'react';
import {useRouter} from 'next/router';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

const styles = require('../styles.styl');

const TopBar: FunctionComponent = () => {
    const {route, asPath} = useRouter();

    let title = 'No title';

    if (route === '/admin/brand') {
        title = 'Бренды';
    }

    if (route === '/admin/product') {
        title = 'Продукты';
    }

    if (route === '/admin/un-product') {
        title = 'Вольные продукты';
    }

    if (route === '/admin/product/[id]') {
        if (asPath === '/admin/product/new') {
            title = 'Добавление нового продукта';
        } else {
            title = 'Редактирование продукта';
        }
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
