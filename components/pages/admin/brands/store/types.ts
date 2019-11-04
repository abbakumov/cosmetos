import {BrandId, Brand} from '../../../../../entities/Brand/types';

import {
    PAGE_ADMIN_BRANDS_FETCH_SUCCESS,
    PAGE_ADMIN_BRANDS_NEW,
    PAGE_ADMIN_BRANDS_SAVE,
    PAGE_ADMIN_BRANDS_SAVE_SUCCESS,
    PAGE_ADMIN_BRANDS_SAVE_FAIL,
    PAGE_ADMIN_BRANDS_CANCEL,
    PAGE_ADMIN_BRANDS_CHANGE_FIELD,
    PAGE_ADMIN_BRANDS_EDIT,
} from './actions';

export interface PageAdminBrandsState {
    ids: BrandId[];
    editBrand?: Brand;
}

// ACTIONS ->

export interface PageAdminBrandsFetchSuccessAction {
    type: typeof PAGE_ADMIN_BRANDS_FETCH_SUCCESS,
    payload: {
        ids: BrandId[];
    };
};

export interface PageAdminBrandsNewAction { 
    type: typeof PAGE_ADMIN_BRANDS_NEW,
};

export interface PageAdminBrandsSaveAction { 
    type: typeof PAGE_ADMIN_BRANDS_SAVE,
};

export interface PageAdminBrandsSaveSuccessAction { 
    type: typeof PAGE_ADMIN_BRANDS_SAVE_SUCCESS,
    payload: {
        brand: Brand;
    };
};

export interface PageAdminBrandsSaveFailAction { 
    type: typeof PAGE_ADMIN_BRANDS_SAVE_FAIL,
};

export interface PageAdminBrandsCancelAction { 
    type: typeof PAGE_ADMIN_BRANDS_CANCEL,
};

export type PageAdminBrandsChangeFieldName = 'titleShort' | 'titleFull';
export interface PageAdminBrandsChangeFieldAction { 
    type: typeof PAGE_ADMIN_BRANDS_CHANGE_FIELD,
    payload: {
        name: PageAdminBrandsChangeFieldName
        value: string;
    };
};

export interface PageAdminBrandsEditAction { 
    type: typeof PAGE_ADMIN_BRANDS_EDIT,
    payload: {
        brand: Brand;
    };
};

// <- ACTIONS

export type PageAdminBrandsAction =
    | PageAdminBrandsFetchSuccessAction
    | PageAdminBrandsNewAction
    | PageAdminBrandsSaveAction
    | PageAdminBrandsSaveSuccessAction
    | PageAdminBrandsSaveFailAction
    | PageAdminBrandsCancelAction
    | PageAdminBrandsChangeFieldAction
    | PageAdminBrandsEditAction
    ;
