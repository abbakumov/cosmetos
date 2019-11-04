import {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {AppState} from '../../../../../../store';
import {ProductBase} from '../../../../../../entities/ProductBase/types';

const styles = require('../../styles.styl');

interface MappedProps {
    products: ProductBase[];
}

interface Props extends MappedProps {}

const AdminProductsTable: FunctionComponent<Props> = (props: Props) => (
    <Table>
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Бренд</TableCell>
                <TableCell>Название</TableCell>
                <TableCell>Действия</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {props.products.map(product => (
                <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>
                        <Link
                            href="/admin/product/[id]"
                            as={`/admin/product/${product.id}`}
                        >
                            <Button
                                variant="contained"
                                size="small"
                            >
                                <Icon
                                    fontSize="small"
                                    className={styles.openIcon}
                                >
                                    open_in_new
                                </Icon>
                                Открыть
                            </Button>
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

function mapStateToProps(state: AppState): MappedProps {
    const {ids} = state.pageAdminProducts;
    const products = ids.map(id => state.productBase.items[id]);

    return {products};
}

const ConnectedAdminProductsTable = connect(mapStateToProps)(AdminProductsTable);

export default ConnectedAdminProductsTable;
