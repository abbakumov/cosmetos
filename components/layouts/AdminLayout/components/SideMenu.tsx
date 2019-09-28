import {FunctionComponent} from 'react';

import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BusinessCenter from '@material-ui/icons/BusinessCenter';

const styles = require('../styles.styl');

const SideMenu: FunctionComponent = () => (
    <Drawer
        variant="permanent"
        className={styles.drawer}
        classes={{
            paper: styles.drawerPaper,
        }}
    >
        <List>
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <BusinessCenter />
                    </ListItemIcon>
                    <ListItemText primary="Продукты" />
                </ListItem>
            </div>
        </List>
    </Drawer>
);

export default SideMenu;