import {BrandId} from '../../../../../entities/Brand/types';
import {ProductColorId} from '../../../../../entities/ProductColor/types';
import {ProductId} from '../../../../../entities/ProductBase/types';

import {
    PAGE_ADMIN_PRODUCT_DATA_FETCHED,
    PAGE_ADMIN_PRODUCT_BRANDS_FETCHED,
    PAGE_ADMIN_PRODUCT_CHANGE_BRAND_ID,
    PAGE_ADMIN_PRODUCT_CHANGE_FIELD,
    PAGE_ADMIN_PRODUCT_CHANGE_PICTURE,
    PAGE_ADMIN_PRODUCT_COLOR_ADD,
    PAGE_ADMIN_PRODUCT_COLOR_CHANGE_FIELD,
    PAGE_ADMIN_PRODUCT_COLOR_CHANGE_PICTURE,
    PAGE_ADMIN_PRODUCT_COLOR_SAVE_SUCCESS,
    PAGE_ADMIN_PRODUCT_COLOR_SAVE_FAIL,
    PAGE_ADMIN_PRODUCT_COLOR_CANCEL,
    PAGE_ADMIN_PRODUCT_COLOR_DELETE_SUCCESS,
    PAGE_ADMIN_PRODUCT_COLOR_DELETE_FAIL,
    PAGE_ADMIN_PRODUCT_SAVE_SUCCESS,
    PAGE_ADMIN_PRODUCT_SAVE_FAIL,
} from './actions';

export interface ProductEdit {
    id: ProductId;
    brandId: BrandId;
    kind: string;
    title: string;
    description: string;
    pictureFile?: File;
    pictureUrl: string;
    colorIds: ProductColorId[];
}

export interface ProductColorEdit {
    title: string;
    colorHex: string;
    pictureFile?: File;
    pictureUrl: string;
}

export interface PageAdminProductState {
    brandIds: BrandId[];
    productEdit: ProductEdit;
    productColorEdit?: ProductColorEdit;
}

export interface PageAdminProductDataFetchedAction {
    type: typeof PAGE_ADMIN_PRODUCT_DATA_FETCHED;
    payload: {
        product: ProductEdit;
        brandIds: BrandId[];
    };
}

export interface PageAdminProductBrandsFetchedAction {
    type: typeof PAGE_ADMIN_PRODUCT_BRANDS_FETCHED;
    payload: {
        brandIds: BrandId[];
    };
}

export interface PageAdminProductChangeBrandIdAction {
    type: typeof PAGE_ADMIN_PRODUCT_CHANGE_BRAND_ID;
    payload: {
        id: BrandId;
    };
}

export type ProductFieldName = 'kind' | 'title' | 'description';
export interface PageAdminProductChangeFieldAction {
    type: typeof PAGE_ADMIN_PRODUCT_CHANGE_FIELD;
    payload: {
        name: ProductFieldName;
        value: string;
    };
}

export interface PageAdminProductChangePictureAction {
    type: typeof PAGE_ADMIN_PRODUCT_CHANGE_PICTURE;
    payload: {
        file: File;
        url: string;
    };
}

export interface PageAdminProductColorAddAction {
    type: typeof PAGE_ADMIN_PRODUCT_COLOR_ADD;
}

export type ProductColorFieldName = 'title' | 'colorHex';
export interface PageAdminProductColorChangeFieldAction {
    type: typeof PAGE_ADMIN_PRODUCT_COLOR_CHANGE_FIELD;
    payload: {
        name: ProductColorFieldName;
        value: string;
    };
}

export interface PageAdminProductColorChangePictureAction {
    type: typeof PAGE_ADMIN_PRODUCT_COLOR_CHANGE_PICTURE;
    payload: {
        file: File;
        url: string;
    };
}

export interface PageAdminProductColorSaveSuccessAction {
    type: typeof PAGE_ADMIN_PRODUCT_COLOR_SAVE_SUCCESS;
    payload: {
        id: ProductColorId;
    };
}

export interface PageAdminProductColorSaveFailAction {
    type: typeof PAGE_ADMIN_PRODUCT_COLOR_SAVE_FAIL;
}

export interface PageAdminProductColorCancelAction {
    type: typeof PAGE_ADMIN_PRODUCT_COLOR_CANCEL;
}

export interface PageAdminProductColorDeleteSuccessAction {
    type: typeof PAGE_ADMIN_PRODUCT_COLOR_DELETE_SUCCESS;
    payload: {
        id: ProductColorId;
    };
}
export interface PageAdminProductColorDeleteFailAction {
    type: typeof PAGE_ADMIN_PRODUCT_COLOR_DELETE_FAIL;
    payload: {
        id: ProductColorId;
    };
}

export interface PageAdminProductSaveSuccessAction {
    type: typeof PAGE_ADMIN_PRODUCT_SAVE_SUCCESS;
    payload: {
        id: ProductId;
    };
}

export interface PageAdminProductSaveFailAction {
    type: typeof PAGE_ADMIN_PRODUCT_SAVE_FAIL;
}

export type PageAdminProductAction =
    | PageAdminProductDataFetchedAction
    | PageAdminProductBrandsFetchedAction
    | PageAdminProductChangeBrandIdAction
    | PageAdminProductChangeFieldAction
    | PageAdminProductChangePictureAction
    | PageAdminProductColorAddAction
    | PageAdminProductColorChangeFieldAction
    | PageAdminProductColorChangePictureAction
    | PageAdminProductColorSaveSuccessAction
    | PageAdminProductColorSaveFailAction
    | PageAdminProductColorCancelAction
    | PageAdminProductColorDeleteSuccessAction
    | PageAdminProductColorDeleteFailAction
    | PageAdminProductSaveSuccessAction
    | PageAdminProductSaveFailAction
    ;
