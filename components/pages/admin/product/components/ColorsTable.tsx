import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Icon from '@material-ui/core/Icon';

import {AppState} from '../../../../../store';
import {ProductColor, ProductColorId} from '../../../../../entities/ProductColor/types';

import {
    pageAdminProductColorAddAction,
    pageAdminProductColorDeleteAction,
} from '../store/actions';

interface MappedProps {
    colors: ProductColor[];
}

interface ActionProps {
    colorAddAction(): void;
    colorDeleteAction(id: ProductColorId): void;
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
                    <TableCell>Удалить</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {props.colors.map(color => (
                    <TableRow key={color.id}>
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
                        <TableCell>
                            <Button
                                onClick={() => {props.colorDeleteAction(color.id)}}
                            >
                                <Icon
                                    fontSize="small"
                                >
                                    delete
                                </Icon>
                            </Button>
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
    colorDeleteAction: pageAdminProductColorDeleteAction,
};

const ConnectedAdminProductColorsTable = connect(mapStateToProps, actionProps)(AdminProductColorsTable);

export default ConnectedAdminProductColorsTable;
