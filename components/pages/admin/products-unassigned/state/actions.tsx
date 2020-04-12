import {UnProductId, UnProduct} from '../../../../../entities/UnProduct/types';
import {AppState} from '../../../../../store';

import {brandProductsFetch} from '../../../../../entities/BrandProducts/actions';
import {productExtraFetchColors} from '../../../../../entities/ProductExtra/actions';

import {
    FieldId,
    FieldText,
    PageAdminUnProductsDataFetchedActionType,
    PageAdminUnProductsCloseProductActionType,
    PageAdminUnProductSaveProductActionType,
    PageAdminUnProductChangeTextAction,
} from './types';

export const PAGE_ADM_PROD_UN_DATA_FETCHED = 'PAGE_ADM_PROD_UN_DATA_FETCHED';
export const PAGE_ADM_PROD_UN_OPEN_PRODUCT = 'PAGE_ADM_PROD_UN_OPEN_PRODUCT';
export const PAGE_ADM_PROD_UN_CLOSE_PRODUCT = 'PAGE_ADM_PROD_UN_CLOSE_PRODUCT';
export const PAGE_ADM_PROD_UN_SAVE_PRODUCT = 'PAGE_ADM_PROD_UN_SAVE_PRODUCT';
export const PAGE_ADM_PROD_UN_CHANGE_TEXT = 'PAGE_ADM_PROD_UN_CHANGE_TEXT';
export const PAGE_ADM_PROD_UN_CHANGE_VALUE = 'PAGE_ADM_PROD_UN_CHANGE_VALUE';

export const pageAdminUnProductsDataFetchedAction
    = (unProductIds: UnProductId[]):PageAdminUnProductsDataFetchedActionType => ({
        type: PAGE_ADM_PROD_UN_DATA_FETCHED,
        payload: {unProductIds},
    });

export const pageAdminUnProductsOpenProductAction = (id: UnProductId) => (dispatch, getState) => {
    const state: AppState = getState();

    const unProduct: UnProduct = state.unProduct.items[id];
    const {brandId, productId} = unProduct;

    if (brandId) {
        dispatch(brandProductsFetch(brandId));
    }

    if (productId) {
        dispatch(productExtraFetchColors(productId));
    }

    dispatch({
        type: PAGE_ADM_PROD_UN_OPEN_PRODUCT,
        payload: {
            id,
            activeBrandId: unProduct.brandId,
            activeBrandText: unProduct.brandText,
            activeProductId: unProduct.productId,
            activeProductText: unProduct.productText,
            activeProductColorId: unProduct.productColorText,
        },
    });
};

export const pageAdminUnProductsCloseProductAction
    = ():PageAdminUnProductsCloseProductActionType => ({
        type: PAGE_ADM_PROD_UN_CLOSE_PRODUCT,
    });

export const pageAdminUnProductSaveProductAction
    = ():PageAdminUnProductSaveProductActionType => ({
        type: PAGE_ADM_PROD_UN_SAVE_PRODUCT,
    });

export const pageAdminUnProductChangeTextAction
    = (field: FieldText, text?: string): PageAdminUnProductChangeTextAction => ({
        type: PAGE_ADM_PROD_UN_CHANGE_TEXT,
        payload: {field, text}
    });

export const pageAdminUnProductChangeValueAction = (field: FieldId, value?: number) => (dispatch) => {
    if (field === 'activeBrandId' && value) {
        dispatch(brandProductsFetch(value));
    }

    if (field === 'activeProductId' && value) {
        dispatch(productExtraFetchColors(value));
    }

    dispatch({
        type: PAGE_ADM_PROD_UN_CHANGE_VALUE,
        payload: {field, value}
    })
};
