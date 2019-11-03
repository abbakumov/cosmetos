import {FunctionComponent} from 'react';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = require('./styles.styl');

const AdminProductsTable: FunctionComponent = () => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Полное название</TableCell>
                <TableCell>Короткое название</TableCell>
                <TableCell>Действия</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Nyx</TableCell>
                <TableCell>Nyx Косметикс</TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        size="small"
                    >
                        <Icon
                            fontSize="small"
                            className={styles.openIcon}
                        >
                            edit
                        </Icon>
                        View & Edit
                    </Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

export default AdminProductsTable;
