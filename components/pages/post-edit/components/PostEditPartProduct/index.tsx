import {FunctionComponent} from 'react';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {PostProductId} from '../../../../../entities/PostProduct/types';
import {UnProductId} from '../../../../../entities/UnProduct/types';

export interface DataProps {
    id: PostProductId | UnProductId
    brand: string
    product: string
    color: string
}

export interface ActionProps {
    productRemoveAction(id: PostProductId | UnProductId): void
}

interface Props extends DataProps, ActionProps {}

const PostEditPartProduct: FunctionComponent<Props> = (props: Props) => (
    <TableRow>
        <TableCell>{props.brand}</TableCell>
        <TableCell>{props.product}</TableCell>
        <TableCell>{props.color}</TableCell>
        <TableCell align="right">
            <Button
                size="small"
                onClick={() => props.productRemoveAction(props.id)}
            >
                <Icon>delete</Icon>
                Удалить
            </Button>
        </TableCell>
    </TableRow>
);

export default PostEditPartProduct;
