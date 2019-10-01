import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {AppState} from '../../../../../../store';
import {UnProductId} from '../../../../../../entities/UnProduct/types';

import UnProductsTableRow from '../UnProductsTableRow';

interface Props {
    unProductIds: UnProductId[];
};

const UnProductsTable: FunctionComponent<Props> = (props: Props) => (
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
            {props.unProductIds.map(id => (
                <UnProductsTableRow key={id} id={id} />
            ))}
        </TableBody>
    </Table>
);

const mapStateToProps = (state: AppState): Props => ({
    unProductIds: state.pageAdminProductsUnassigned.unProductIds,
});

const ConnectedUnProductsTable = connect(mapStateToProps)(UnProductsTable);

export default ConnectedUnProductsTable;
