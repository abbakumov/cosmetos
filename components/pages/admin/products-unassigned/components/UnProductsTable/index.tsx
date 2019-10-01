import {FunctionComponent} from 'react';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = require('../../styles.styl');

const UnProductsTable: FunctionComponent = () => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Бренд</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Пост</TableCell>
                <TableCell>Действия</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Nyx Cosmetos</TableCell>
                <TableCell>Помада шмада</TableCell>
                <TableCell>
                    Elizabeth Ioda / Что-то там например
                    <Button
                        className={styles.openPostButton}
                        variant="contained"
                        size="small"
                    >
                        <Icon
                            fontSize="small"
                            className={styles.openIcon}
                        >
                            open_in_new
                        </Icon>
                    </Button>
                </TableCell>
                <TableCell>
                    <Button
                        variant="contained"
                        size="small"
                    >
                        <Icon
                            fontSize="small"
                            className={styles.openIcon}
                        >
                            add
                        </Icon>
                        Привязать
                    </Button>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
);

export default UnProductsTable;
