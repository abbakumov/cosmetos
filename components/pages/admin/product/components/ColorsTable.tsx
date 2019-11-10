import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {AppState} from '../../../../../store';
import {ProductColor} from '../../../../../entities/ProductColor/types';

import {
    pageAdminProductColorAddAction,
} from '../store/actions';

interface MappedProps {
    colors: ProductColor[];
}

interface ActionProps {
    colorAddAction(): void;
}

interface Props extends MappedProps, ActionProps {}

const AdminProductColorsTable: FunctionComponent<Props> = (props: Props) => (
    <div>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Фото</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.colors.map(color => (
                    <TableRow>
                        <TableCell>{color.id}</TableCell>
                        <TableCell>{color.title}</TableCell>
                        <TableCell>
                            <img
                                style={{
                                    maxWidth: '100px',
                                    maxHeight: '100px',
                                }}
                                src={color.picUrl}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Toolbar>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {props.colorAddAction()}}
            >
                Добавить
            </Button>
        </Toolbar>
    </div>
);

function mapStateToProps(state: AppState) {
    const {colorIds} = state.pageAdminProduct.productEdit;

    const colors = colorIds.map(id => state.productColor.items[id]);

    return {colors};
}

const actionProps = {
    colorAddAction: pageAdminProductColorAddAction,
};

const ConnectedAdminProductColorsTable = connect(mapStateToProps, actionProps)(AdminProductColorsTable);

export default ConnectedAdminProductColorsTable;
