import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';

export interface PostEditPartProductProps {
    id: ProductId;
}

interface Props {
    brand: string;
    product: string;
    color: string;
}

const PostEditPartProduct: FunctionComponent<Props> = (props: Props) => (
    <TableRow>
        <TableCell>{props.brand}</TableCell>
        <TableCell>{props.product}</TableCell>
        <TableCell>{props.color}</TableCell>
        <TableCell align="right">
            <Button size="small">
                <Icon>delete</Icon>
                Удалить
            </Button>
        </TableCell>
    </TableRow>
);

function mapStateToProps(state: AppState, ownProps: PostEditPartProductProps) {
    const product = state.productBase.items[ownProps.id];
    const {brand, title} = product;

    const ppItems = state.postProduct.items;
    const ppIds = Object.keys(ppItems);
    const postProductId = ppIds.find(ppId => (
        // post product postId is our post id?
        ppItems[ppId].postId === state.pagePostEdit.postEdit.id
        // post product productId is our product id?
        && ppItems[ppId].productId === ownProps.id
    ));
    const postProduct = state.postProduct.items[postProductId];

    const color = state.productColor.items[postProduct.colorId];

    return {
        brand,
        product: title,
        color: color.title,
    };
}

const ConnectedPostEditPartProduct = connect(mapStateToProps)(PostEditPartProduct);

export default ConnectedPostEditPartProduct;