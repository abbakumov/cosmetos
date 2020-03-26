import {FunctionComponent} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessCenter from '@material-ui/icons/BusinessCenter';
import NewReleases from '@material-ui/icons/NewReleases';
import Motorcycle from '@material-ui/icons/Motorcycle';

const styles = require('../styles.styl');

const SideMenu: FunctionComponent = () => {
    const {route} = useRouter();

    return (
        <Drawer
            variant="permanent"
            className={styles.drawer}
            classes={{
                paper: styles.drawerPaper,
            }}
        >
            <List>
                <div>
                    <Link href="/admin/brand">
                        <ListItem
                            button
                            selected={route === '/admin/brand'}
                        >
                            <ListItemIcon>
                                <Motorcycle />
                            </ListItemIcon>
                            <ListItemText primary="Бренды" />
                        </ListItem>
                    </Link>
                    <Link href="/admin/product">
                        <ListItem
                            button
                            selected={route === '/admin/product'}
                        >
                            <ListItemIcon>
                                <BusinessCenter />
                            </ListItemIcon>
                            <ListItemText primary="Продукты" />
                        </ListItem>
                    </Link>
                    <Link href="/admin/un-product">
                        <ListItem
                            button
                            selected={route === '/admin/un-product'}
                        >
                            <ListItemIcon>
                                <NewReleases />
                            </ListItemIcon>
                            <ListItemText primary="Вольные продукты" />
                        </ListItem>
                    </Link>
                </div>
            </List>
        </Drawer>
    );
};

export default SideMenu;