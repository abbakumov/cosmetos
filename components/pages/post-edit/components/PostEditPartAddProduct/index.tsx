import {FunctionComponent, useCallback} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';

import {AppState} from '../../../../../store';

import {BrandId} from '../../../../../entities/Brand/types';
import {ProductId} from '../../../../../entities/ProductBase/types';
import {ProductColorId} from '../../../../../entities/ProductColor/types';

import PostEditPartProductDropDown from '../PostEditPartProductDropDown';

import {
    postEditProductCancelAction,
    postEditProductSaveAction,
    postEditProductBrandChangeAction,
    postEditProductProductChangeAction,
    postEditProductColorChangeAction,
} from '../../store/actions';

const styles = require('./styles.styl');

interface MappedProps {
    isSaving: boolean
    chosedBrandText: string
    chosedProductText: string
    chosedProductColorText: string
}

interface ActionProps {
    cancelAction() : void
    saveAction(): void
    brandChangeAction(id: BrandId | null): void
    productChangeAction(id: ProductId | null): void
    colorChangeAction(id: ProductColorId | null): void
}

interface Props extends MappedProps, ActionProps {}

const PostEditPartAddProduct: FunctionComponent<Props> = (props: Props) => {
    const _cancelAction = useCallback(props.cancelAction, []);
    const _saveAction = useCallback(props.saveAction, []);
    const _removeBrandAction = useCallback(() => props.brandChangeAction(null), []);
    const _removeProductAction = useCallback(() => props.productChangeAction(null), []);
    const _removeProductColorAction = useCallback(() => props.colorChangeAction(null), []);

    return (
        <div className={styles.root}>
            <div className={styles.head}>Добавление продукта</div>
            <div className={styles.content}>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        {props.chosedBrandText
                            ? (
                                <div className={styles.valueLabel}>
                                    {props.chosedBrandText}
                                    <Icon
                                        fontSize="small"
                                        className={styles.valueLabelClean}
                                        onClick={_removeBrandAction}
                                    >
                                        clear
                                    </Icon>
                                </div>
                            )
                            : <PostEditPartProductDropDown id="brand" />
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {props.chosedProductText
                            ? (
                                <div className={styles.valueLabel}>
                                    {props.chosedProductText}
                                    <Icon
                                        fontSize="small"
                                        className={styles.valueLabelClean}
                                        onClick={_removeProductAction}
                                    >
                                        clear
                                    </Icon>
                                </div>
                            )
                            : <PostEditPartProductDropDown id="product" />
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {props.chosedProductColorText
                            ? (
                                <div className={styles.valueLabel}>
                                    {props.chosedProductColorText}
                                    <Icon
                                        fontSize="small"
                                        className={styles.valueLabelClean}
                                        onClick={_removeProductColorAction}
                                    >
                                        clear
                                    </Icon>
                                </div>
                            )
                            : <PostEditPartProductDropDown id="color" />
                        }
                    </Grid>
                </Grid>
                <div className={styles.bottomControls}>
                    <Button className={styles.control} onClick={_cancelAction}>
                        Отмена
                    </Button>
                    <Button
                        className={styles.control}
                        color="secondary"
                        variant="contained"
                        disabled={props.isSaving}
                        onClick={_saveAction}
                    >
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps(state: AppState): MappedProps {
    const {
        isSaving,
        brandId,
        productId,
        productColorId,
    } = state.pagePostEdit.editPostPartProduct;

    const chosedBrandText = brandId ? state.brand.items[brandId].titleFull : null;
    const chosedProductText = productId ? state.productBase.items[productId].title : null;
    const chosedProductColorText = productColorId ? state.productColor.items[productColorId].title: null;

    return {
        isSaving,
        chosedBrandText,
        chosedProductText,
        chosedProductColorText,
    };
}

const actionProps = {
    cancelAction: postEditProductCancelAction,
    saveAction: postEditProductSaveAction,
    brandChangeAction: postEditProductBrandChangeAction,
    productChangeAction: postEditProductProductChangeAction,
    colorChangeAction: postEditProductColorChangeAction,
};

const ConnectedPostEditPartAddProduct = connect(mapStateToProps, actionProps)(PostEditPartAddProduct);

export default ConnectedPostEditPartAddProduct;
