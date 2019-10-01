import {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {AppState} from '../../../../../../store';
import {UnProductId, UnProduct} from '../../../../../../entities/UnProduct/types';
import {PostBase} from '../../../../../../entities/PostBase/types';

const styles = require('../../styles.styl');

interface UnProductsTableRowProps {
    id: UnProductId;
}

interface Props {
    id: UnProductId;
    brand: string;
    title: string;
    postTitle: string;
}

const UnProductsTableRow: FunctionComponent<Props> = (props: Props) => (
    <TableRow>
        <TableCell>{props.id}</TableCell>
        <TableCell>{props.brand}</TableCell>
        <TableCell>{props.title}</TableCell>
        <TableCell>
            Elizabeth Ioda / Что-то там например
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
        </TableCell>
        <TableCell>
            <Button
                variant="contained"
                size="small"
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

function mapStateToProps(state: AppState, ownProps: UnProductsTableRowProps): Props {
    const unProduct = state.unProduct.items[ownProps.id];
    const {brandId, brandText, productId, productText} = unProduct;

    let brand = '';
    if (brandId) {
        brand = state.brand.items[brandId].shortName;
    } else {
        brand = brandText;
    }

    let title = '';
    if (productId) {
        title = state.productBase.items[productId].title;
    } else {
        title = productText;
    }

    let postTitle = '';

    return {
        id: ownProps.id,
        brand,
        title,
        postTitle,
    };
}

const ConnectedUnProductsTableRow = connect(mapStateToProps)(UnProductsTableRow);

export default ConnectedUnProductsTableRow;
