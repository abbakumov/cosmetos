import {FunctionComponent, useCallback} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import TextField from '@material-ui/core/TextField';

import {AppState} from '../../../../../../store';
import {UnProduct} from '../../../../../../entities/UnProduct/types';
import {pageAdminUnProductsCloseProductAction} from '../../state/actions';

const styles = require('../../styles.styl');

interface DataProps {
    isActive: boolean
    postAuthorName?: string
    postTitle?: string
    initialBrandText?: string
    initialProductText?: string
    initialProductColorText?: string
}

interface ActionProps {
    closeProductAction(): void
}

interface Props extends DataProps, ActionProps {}

const UnProductsModal: FunctionComponent<Props> = (props: Props) => {
    if (!props.isActive) {
        return null;
    }

    const closeProductAction = useCallback(() => props.closeProductAction(), []);

    return (
        <Dialog open={true} onClose={closeProductAction}>
            <DialogTitle>Выбор соответствующего продукта</DialogTitle>
            <DialogContent dividers>
                <div className={styles.unassignedProductInfo}>
                    <div className={styles.line}>
                        <span className={styles.lineLabel}>Блог: </span>
                        <span>Лиза Иода</span>
                    </div>
                    <div className={styles.line}>
                        <span className={styles.lineLabel}>Пост: </span>
                        <span>Nyx Shmiks</span>
                    </div>
                    <div className={styles.line}>
                        <span className={styles.lineLabel}>Указанный бренд: </span>
                        <span>{props.initialBrandText}</span>
                    </div>
                    <div className={styles.line}>
                        <span className={styles.lineLabel}>Указанный продукт: </span>
                        <span>{props.initialProductText}</span>
                    </div>
                    <div className={styles.line}>
                        <span className={styles.lineLabel}>Указанный цвет продукта: </span>
                        <span>{props.initialProductColorText}</span>
                    </div>
                </div>
                <TextField
                    className={styles.popupField}
                    label="Бренд"
                    variant="outlined"
                />
                <TextField
                    className={styles.popupField}
                    label="Продукт"
                    variant="outlined"
                />
                <TextField
                    className={styles.popupField}
                    label="Цвет продукта"
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeProductAction}>Отмена</Button>
                <Button color="primary">Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
}

function mapStateToProps(state: AppState): DataProps {
    const {
        activeUnProductId,
        activeBrandId,
        activeProductId,
        activeProductColorId,
    } = state.pageAdminUnProducts;

    if (!activeUnProductId) {
        return {isActive: false};
    }

    const unProduct = state.unProduct.items[activeUnProductId] as UnProduct;

    const {
        brandId,
        brandText,
        productId,
        productText,
        productColorText,
    } = unProduct;

    const initialBrandText = brandId ? state.brand.items[brandId].titleFull : brandText;
    const initialProductText = productId ? state.productBase.items[productId].title : productText;
    const initialProductColorText = productColorText;

    return {
        isActive: Boolean(activeUnProductId),
        initialBrandText,
        initialProductText,
        initialProductColorText,
    };
}

const actionProps = {
    closeProductAction: pageAdminUnProductsCloseProductAction,
};

export default connect(mapStateToProps, actionProps)(UnProductsModal);
