import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {AppState} from '../../../../../store';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {postEditProductRemoveAction} from '../../store/actions';
import {PostProductId} from '../../../../../entities/PostProduct/types';

export interface PostEditPartProductProps {
    id: ProductId;
}

interface MappedProps {
    postProductId: PostProductId;
    brand: string;
    product: string;
    color: string;
}

interface ActionProps {
    productRemoveAction(id: PostProductId): void;
}

interface Props extends MappedProps, ActionProps {}

const PostEditPartProduct: FunctionComponent<Props> = (props: Props) => (
    <TableRow>
        <TableCell>{props.brand}</TableCell>
        <TableCell>{props.product}</TableCell>
        <TableCell>{props.color}</TableCell>
        <TableCell align="right">
            <Button
                size="small"
                onClick={() => props.productRemoveAction(props.postProductId)}
            >
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
    const postProduct = Object.values(ppItems).find(_postProduct => (
        // post product postId is current post id?
        _postProduct.postId === state.pagePostEdit.postEdit.id
        // post product productId is current product id?
        && _postProduct.productId === ownProps.id
    ));

    const color = state.productColor.items[postProduct.productColorId];

    return {
        postProductId: postProduct.id,
        brand,
        product: title,
        color: color.title,
    };
}

const actionProps = {
    productRemoveAction: postEditProductRemoveAction,
};

const ConnectedPostEditPartProduct = connect(mapStateToProps, actionProps)(PostEditPartProduct);

export default ConnectedPostEditPartProduct;