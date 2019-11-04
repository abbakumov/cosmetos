import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {AppState} from '../../../../../../store';
import {Brand} from '../../../../../../entities/Brand/types';

import {pageAdminBrandsEditAction} from '../../store/actions';

const styles = require('./styles.styl');

interface MappedProps {
    items: Brand[];
}

interface ActionProps {
    pageAdminBrandsEditAction(brand: Brand): void;
}

interface Props extends MappedProps, ActionProps {}

const AdminProductsTable: FunctionComponent<Props> = (props: Props) => (
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
            {props.items.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.titleFull}</TableCell>
                    <TableCell>{item.titleShort}</TableCell>
                    <TableCell>
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {props.pageAdminBrandsEditAction(item)}}
                        >
                            <Icon
                                fontSize="small"
                                className={styles.openIcon}
                            >
                                edit
                            </Icon>
                            Редактировать
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

function mapStateToProps(state: AppState) {
    const {ids} = state.pageAdminBrands;

    const items = ids.map(id => state.brand.items[id]);

    return {
        items,
    };
}

const actionProps = {
    pageAdminBrandsEditAction,
};

const ConnectedAdminProductsTable = connect(mapStateToProps, actionProps)(AdminProductsTable);

export default ConnectedAdminProductsTable;
