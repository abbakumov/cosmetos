import {
    PageAdminProductDataFetchedAction,
    PageAdminProductChangeBrandIdAction,
    PageAdminProductChangeFieldAction,
    PageAdminProductChangePictureAction,
    PageAdminProductColorAddAction,
    PageAdminProductColorChangeFieldAction,
    PageAdminProductColorChangePictureAction,
    PageAdminProductColorSaveSuccessAction,
    PageAdminProductColorSaveFailAction,
    PageAdminProductColorCancelAction,
    PageAdminProductColorDeleteSuccessAction,
    PageAdminProductColorDeleteFailAction,
    PageAdminProductSaveSuccessAction,
    PageAdminProductSaveFailAction,
    ProductEdit,
    ProductFieldName,
    ProductColorFieldName,
} from './types';
import {BrandId} from '../../../../../entities/Brand/types';
import {ProductColorId} from '../../../../../entities/ProductColor/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

export const PAGE_ADMIN_PRODUCT_DATA_FETCHED = 'PAGE_ADMIN_PRODUCT_DATA_FETCHED';
export const PAGE_ADMIN_PRODUCT_CHANGE_BRAND_ID = 'PAGE_ADMIN_PRODUCT_CHANGE_BRAND_ID';
export const PAGE_ADMIN_PRODUCT_CHANGE_FIELD = 'PAGE_ADMIN_PRODUCT_CHANGE_FIELD';
export const PAGE_ADMIN_PRODUCT_CHANGE_PICTURE = 'PAGE_ADMIN_PRODUCT_CHANGE_PICTURE';
export const PAGE_ADMIN_PRODUCT_COLOR_ADD = 'PAGE_ADMIN_PRODUCT_COLOR_ADD';
export const PAGE_ADMIN_PRODUCT_COLOR_CHANGE_FIELD = 'PAGE_ADMIN_PRODUCT_COLOR_CHANGE_FIELD';
export const PAGE_ADMIN_PRODUCT_COLOR_CHANGE_PICTURE = 'PAGE_ADMIN_PRODUCT_COLOR_CHANGE_PICTURE';
export const PAGE_ADMIN_PRODUCT_COLOR_SAVE = 'PAGE_ADMIN_PRODUCT_COLOR_SAVE';
export const PAGE_ADMIN_PRODUCT_COLOR_SAVE_SUCCESS = 'PAGE_ADMIN_PRODUCT_COLOR_SAVE_SUCCESS';
export const PAGE_ADMIN_PRODUCT_COLOR_SAVE_FAIL = 'PAGE_ADMIN_PRODUCT_COLOR_SAVE_FAIL';
export const PAGE_ADMIN_PRODUCT_COLOR_CANCEL = 'PAGE_ADMIN_PRODUCT_COLOR_CANCEL';
export const PAGE_ADMIN_PRODUCT_COLOR_DELETE = 'PAGE_ADMIN_PRODUCT_COLOR_DELETE';
export const PAGE_ADMIN_PRODUCT_COLOR_DELETE_SUCCESS = 'PAGE_ADMIN_PRODUCT_COLOR_DELETE_SUCCESS';
export const PAGE_ADMIN_PRODUCT_COLOR_DELETE_FAIL = 'PAGE_ADMIN_PRODUCT_COLOR_DELETE_FAIL';
export const PAGE_ADMIN_PRODUCT_SAVE = 'PAGE_ADMIN_PRODUCT_SAVE';
export const PAGE_ADMIN_PRODUCT_SAVE_SUCCESS = 'PAGE_ADMIN_PRODUCT_SAVE_SUCCESS';
export const PAGE_ADMIN_PRODUCT_SAVE_FAIL = 'PAGE_ADMIN_PRODUCT_SAVE_FAIL';

export const pageAdminProductDataFetchedAction = (data: ProductEdit): PageAdminProductDataFetchedAction => ({
    type: PAGE_ADMIN_PRODUCT_DATA_FETCHED,
    payload: {data},
});

export const pageAdminProductChangeBrandIdAction = (id: BrandId): PageAdminProductChangeBrandIdAction => ({
    type: PAGE_ADMIN_PRODUCT_CHANGE_BRAND_ID,
    payload: {id},
});

export const pageAdminProductChangeFieldAction = (name: ProductFieldName, value: string): PageAdminProductChangeFieldAction => ({
    type: PAGE_ADMIN_PRODUCT_CHANGE_FIELD,
    payload: {name, value},
});

export const pageAdminProductChangePictureAction = (file: File, url: string): PageAdminProductChangePictureAction => ({
    type: PAGE_ADMIN_PRODUCT_CHANGE_PICTURE,
    payload: {file, url},
});

export const pageAdminProductColorAddAction = (): PageAdminProductColorAddAction => ({
    type: PAGE_ADMIN_PRODUCT_COLOR_ADD,
});

export const pageAdminProductColorChangeFieldAction =
    (name: ProductColorFieldName, value: string): PageAdminProductColorChangeFieldAction => ({
        type: PAGE_ADMIN_PRODUCT_COLOR_CHANGE_FIELD,
        payload: {name, value},
    });

export const pageAdminProductColorChangePictureAction = (file: File, url: string): PageAdminProductColorChangePictureAction => ({
    type: PAGE_ADMIN_PRODUCT_COLOR_CHANGE_PICTURE,
    payload: {file, url},
});

export const pageAdminProductColorSaveSuccessAction = (id: ProductColorId): PageAdminProductColorSaveSuccessAction => ({
    type: PAGE_ADMIN_PRODUCT_COLOR_SAVE_SUCCESS,
    payload: {id},
});

export const pageAdminProductColorSaveFailAction = (): PageAdminProductColorSaveFailAction => ({
    type: PAGE_ADMIN_PRODUCT_COLOR_SAVE_FAIL,
});

export const pageAdminProductColorCancelAction = (): PageAdminProductColorCancelAction => ({
    type: PAGE_ADMIN_PRODUCT_COLOR_CANCEL,
});

export const pageAdminProductColorDeleteSuccessAction = (id: ProductColorId): PageAdminProductColorDeleteSuccessAction => ({
    type: PAGE_ADMIN_PRODUCT_COLOR_DELETE_SUCCESS,
    payload: {id},
});

export const pageAdminProductColorDeleteFailAction = (id: ProductColorId): PageAdminProductColorDeleteFailAction => ({
    type: PAGE_ADMIN_PRODUCT_COLOR_DELETE_FAIL,
    payload: {id},
});

export const pageAdminProductSaveSuccessAction = (id: ProductId): PageAdminProductSaveSuccessAction => ({
    type: PAGE_ADMIN_PRODUCT_SAVE_SUCCESS,
    payload: {id},
});

export const pageAdminProductSaveFailAction = (): PageAdminProductSaveFailAction => ({
    type: PAGE_ADMIN_PRODUCT_SAVE_FAIL,
});

