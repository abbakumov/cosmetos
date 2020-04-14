import {FunctionComponent, useCallback} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Clear from '@material-ui/icons/Clear';

import {AppState} from '../../../../../../store';
import {UnProduct} from '../../../../../../entities/UnProduct/types';
import {
    pageAdminUnProductsCloseProductAction,
    pageAdminUnProductChangeValueAction,
} from '../../state/actions';

import UnProductModalInputBrand from '../UnProductModalInputBrand';
import UnProductModalInputProduct from '../UnProductModalInputProduct';
import UnProductModalInputProductColor from '../UnProductModalInputProductColor';

const styles = require('../../styles.styl');

interface DataProps {
    isActive: boolean
    isSaveActive?: boolean
    postAuthorName?: string
    postTitle?: string
    initialBrandText?: string
    initialProductText?: string
    initialProductColorText?: string
    fulfilledBrandText?: string
    fulfilledProductText?: string
    fulfilledProductColorText?: string
}

interface ActionProps {
    closeProductAction(): void
    removeBrand(): void
    removeProduct(): void
    removeProductColor(): void
}

interface Props extends DataProps, ActionProps {}

const UnProductsModal: FunctionComponent<Props> = (props: Props) => {
    if (!props.isActive) {
        return null;
    }

    const closeProductAction = useCallback(() => props.closeProductAction(), []);
    const removeBrand = useCallback(() => props.removeBrand(), []);
    const removeProduct = useCallback(() => props.removeProduct(), []);
    const removeProductColor = useCallback(() => props.removeProductColor(), []);

    return (
        <Dialog open={true} onClose={closeProductAction}>
            <DialogTitle>Выбор соответствующего продукта</DialogTitle>
            <DialogContent className={styles.modalContent} dividers>
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
                <div className={styles.modalRow}>
                    <div className={styles.modalRowItem}>
                        {Boolean(props.fulfilledBrandText)
                            ? (
                                <div className={styles.modalRowItemFulfilledContent}>
                                    <div>{props.fulfilledBrandText}</div>
                                    {!props.fulfilledProductText && !props.fulfilledProductColorText && (
                                        <Clear
                                            className={styles.modalRowItemClear}
                                            onClick={removeBrand}
                                        />
                                    )}
                                </div>
                            ) : <UnProductModalInputBrand />
                        }
                    </div>
                    {Boolean(props.fulfilledBrandText) && (
                        <div className={styles.modalRowItem}>
                            {Boolean(props.fulfilledProductText)
                                ? (
                                    <div className={styles.modalRowItemFulfilledContent}>
                                        <div>{props.fulfilledProductText}</div>
                                        {!props.fulfilledProductColorText && (
                                            <Clear
                                                className={styles.modalRowItemClear}
                                                onClick={removeProduct}
                                            />
                                        )}
                                    </div>
                                ) : <UnProductModalInputProduct />
                            }
                        </div>
                    )}
                    {Boolean(props.fulfilledProductText) && (
                        <div className={styles.modalRowItem}>
                            {Boolean(props.fulfilledProductColorText)
                                ? (
                                    <div className={styles.modalRowItemFulfilledContent}>
                                        <div>{props.fulfilledProductColorText}</div>
                                        <Clear
                                            className={styles.modalRowItemClear}
                                            onClick={removeProductColor}
                                        />
                                    </div>
                                ) : <UnProductModalInputProductColor />
                            }
                        </div>
                    )}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeProductAction}>Отмена</Button>
                {props.isSaveActive && <Button color="primary">Сохранить</Button>}
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

    const fulfilledBrandText = activeBrandId ? state.brand.items[activeBrandId].titleShort : null;
    const fulfilledProductText = activeProductId ? state.productBase.items[activeProductId].title : null;
    const fulfilledProductColorText = activeProductColorId ? state.productColor.items[activeProductColorId].title : null;

    const isSaveActive = Boolean(activeBrandId && activeProductId);

    return {
        isActive: Boolean(activeUnProductId),
        isSaveActive,
        initialBrandText,
        initialProductText,
        initialProductColorText,
        fulfilledBrandText,
        fulfilledProductText,
        fulfilledProductColorText,
    };
}

const actionProps = {
    closeProductAction: pageAdminUnProductsCloseProductAction,
    removeBrand: () => pageAdminUnProductChangeValueAction('activeBrandId', null),
    removeProduct: () => pageAdminUnProductChangeValueAction('activeProductId', null),
    removeProductColor: () => pageAdminUnProductChangeValueAction('activeProductColorId', null),
};

export default connect(mapStateToProps, actionProps)(UnProductsModal);
