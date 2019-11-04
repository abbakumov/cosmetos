import {BrandId, Brand} from '../../../../../entities/Brand/types';

import {AppState} from '../../../../../store';
import {saveBrand} from '../../../../../entities/Brand/api';

import {
    PageAdminBrandsFetchSuccessAction,
    PageAdminBrandsNewAction,
    PageAdminBrandsSaveAction,
    PageAdminBrandsSaveSuccessAction,
    PageAdminBrandsSaveFailAction,
    PageAdminBrandsCancelAction,
    PageAdminBrandsChangeFieldName,
    PageAdminBrandsChangeFieldAction,
    PageAdminBrandsEditAction,
} from './types';

export const PAGE_ADMIN_BRANDS_FETCH_SUCCESS = 'PAGE_ADMIN_BRANDS_FETCH_SUCCESS';
export const PAGE_ADMIN_BRANDS_NEW = 'PAGE_ADMIN_BRANDS_NEW';
export const PAGE_ADMIN_BRANDS_SAVE = 'PAGE_ADMIN_BRANDS_SAVE';
export const PAGE_ADMIN_BRANDS_SAVE_SUCCESS = 'PAGE_ADMIN_BRANDS_SAVE_SUCCESS';
export const PAGE_ADMIN_BRANDS_SAVE_FAIL = 'PAGE_ADMIN_BRANDS_SAVE_FAIL';
export const PAGE_ADMIN_BRANDS_CANCEL = 'PAGE_ADMIN_BRANDS_CANCEL';
export const PAGE_ADMIN_BRANDS_CHANGE_FIELD = 'PAGE_ADMIN_BRANDS_CHANGE_FIELD';
export const PAGE_ADMIN_BRANDS_EDIT = 'PAGE_ADMIN_BRANDS_EDIT';

export const pageAdminBrandsFetchSuccessAction = (ids: BrandId[]):PageAdminBrandsFetchSuccessAction => ({
    type: PAGE_ADMIN_BRANDS_FETCH_SUCCESS,
    payload: {ids},
});

export const pageAdminBrandsNewAction = ():PageAdminBrandsNewAction => ({
    type: PAGE_ADMIN_BRANDS_NEW,
});

export const pageAdminBrandsSaveAction = () => (dispatch, getState) => {
    const state: AppState = getState();
    const {editBrand} = state.pageAdminBrands;

    saveBrand(editBrand).then(result => {
        if (result.status === 'success') {
            const brand = {
                ...editBrand,
                id: result.brandId
            };
            dispatch(pageAdminBrandsSaveSuccessAction(brand));
        } else {
            dispatch(pageAdminBrandsSaveFailAction());
        }
    });
};

export const pageAdminBrandsSaveSuccessAction = (brand: Brand):PageAdminBrandsSaveSuccessAction => ({
    type: PAGE_ADMIN_BRANDS_SAVE_SUCCESS,
    payload: {brand}
});

export const pageAdminBrandsSaveFailAction = ():PageAdminBrandsSaveFailAction => ({
    type: PAGE_ADMIN_BRANDS_SAVE_FAIL,
});

export const pageAdminBrandsCancelAction = ():PageAdminBrandsCancelAction => ({
    type: PAGE_ADMIN_BRANDS_CANCEL,
});

export const pageAdminBrandsChangeFieldAction = (name: PageAdminBrandsChangeFieldName, value: string):PageAdminBrandsChangeFieldAction => ({
    type: PAGE_ADMIN_BRANDS_CHANGE_FIELD,
    payload: {name, value},
});

export const pageAdminBrandsEditAction = (brand: Brand):PageAdminBrandsEditAction => ({
    type: PAGE_ADMIN_BRANDS_EDIT,
    payload: {brand},
});
