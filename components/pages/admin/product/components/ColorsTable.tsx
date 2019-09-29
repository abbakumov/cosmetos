import {FunctionComponent} from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const AdminProductColorsTable: FunctionComponent = () => (
    <div>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>hex</TableCell>
                    <TableCell>Фото</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Персиковый сложный глубокий</TableCell>
                    <TableCell>#cc33af</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <Toolbar>
            <Button variant="contained" color="primary">Добавить</Button>
        </Toolbar>
    </div>
);

export default AdminProductColorsTable;
