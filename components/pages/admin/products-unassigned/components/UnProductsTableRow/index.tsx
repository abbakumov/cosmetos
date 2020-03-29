import {FunctionComponent} from 'react';
import {connect} from 'react-redux';
import Link from 'next/link';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import {AppState} from '../../../../../../store';
import {UnProductId, UnProduct} from '../../../../../../entities/UnProduct/types';
import {UnProductExtra} from '../../../../../../entities/UnProductExtra/types';
import {PostId} from '../../../../../../entities/Post/types';
import {pageAdminUnProductsOpenProductAction} from '../../state/actions';

const styles = require('../../styles.styl');

interface UnProductsTableRowProps {
    id: UnProductId;
}

interface MappedProps {
    id: UnProductId
    isBrandAssigned: boolean
    isProductAssigned: boolean
    brand: string
    title: string
    color: string
    postTitle: string
    postId: PostId
    userName: string
}

interface ActionProps {
    openProductAction(id: UnProductId): void,
}

interface Props extends MappedProps, ActionProps {}

const UnProductsTableRow: FunctionComponent<Props> = (props: Props) => (
    <TableRow>
        <TableCell>{props.id}</TableCell>
        <TableCell className={props.isBrandAssigned ? '' : styles.tableRowUnassigned}>
            {props.brand}
        </TableCell>
        <TableCell className={props.isProductAssigned ? '' : styles.tableRowUnassigned}>
            {props.title}
        </TableCell>
        <TableCell className={styles.tableRowUnassigned}>{props.color}</TableCell>
        <TableCell>
            {props.userName} / {props.postTitle}
            <Link
                href="/post/[id]"
                as={`/post/${props.postId}`}
            >
                <a target="_blank">
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
                </a>
            </Link>
        </TableCell>
        <TableCell>
            <Button
                variant="contained"
                size="small"
                // Yes, that's not React way, but here that doesn't make a problem
                onClick={() => props.openProductAction(props.id)}
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
);

function mapStateToProps(state: AppState, ownProps: UnProductsTableRowProps): MappedProps {
    const unProduct = state.unProduct.items[ownProps.id] as UnProduct;
    const unProductExtra = state.unProductExtra.items[ownProps.id] as UnProductExtra;
    const {brandId, brandText, productId, productText, productColorText} = unProduct;

    const isBrandAssigned = Boolean(brandId);
    const isProductAssigned = Boolean(productId);

    const brand = isBrandAssigned ? state.brand.items[brandId].titleShort : brandText;
    const title = isProductAssigned ? state.productBase.items[productId].title : productText;

    const {postTitle, postId, userName} = unProductExtra || {};

    return {
        id: ownProps.id,
        isBrandAssigned,
        isProductAssigned,
        brand,
        title,
        color: productColorText,
        postTitle,
        postId,
        userName,
    };
}

const actionProps = {
    openProductAction: pageAdminUnProductsOpenProductAction,
};

const ConnectedUnProductsTableRow = connect(mapStateToProps, actionProps)(UnProductsTableRow);

export default ConnectedUnProductsTableRow;
