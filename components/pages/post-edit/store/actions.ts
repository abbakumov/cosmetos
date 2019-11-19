import _ from 'lodash';

import {PostPartId} from '../../../../entities/PostPart/types';
import {GetBrandProductsResponse} from '../../../../entities/BrandProducts/api';
import {GetProductColorsResponse} from '../../../../entities/ProductBase/api';
import {
    PostEditPageDataFetchedAction,

    PostEditFileChange,
    PostEditFieldChange,
    PostEditIsPublicChange,

    PostEditStartAddProductAction,
    PostEditProductFieldTextChangeAction,
    PostEditProductColorChangeAction,
    PostEditProductCancelAction,

    PostEditPartNewAction,
    PostEditPartEditAction,
    PostEditPartChangeFieldAction,
    PostEditPartChangePositionAction,
    PostEditPartCancelAction,

    PostEditPageData,
    PostEditFieldChangeName,
} from './types';
import {brandProductsDataFetchedAction} from '../../../../entities/BrandProducts/actions';
import {productsBaseDataFetchedAction} from '../../../../entities/ProductBase/actions';
import {productColorsDataFetchedAction} from '../../../../entities/ProductColor/actions';
import {productExtraDataFetchedAction} from '../../../../entities/ProductExtra/actions';
import {ProductColorId} from '../../../../entities/ProductColor/types';
import {BrandId} from '../../../../entities/Brand/types';
import {ProductId} from '../../../../entities/ProductBase/types';
import {Position} from '../../../../entities/Position';
import {
    savePostPart,
    savePostPartProduct,
    deletePostPartProduct,
} from '../../../../entities/PostPart/api';
import {PostProductId} from '../../../../entities/PostProduct/types';

import {AppState} from '../../../../store';

export const POST_EDIT_PAGE_DATA_FETCHED = 'POST_EDIT_PAGE_DATA_FETCHED';
export const POST_EDIT_FILE_CHANGE = 'POST_EDIT_FILE_CHANGE';
export const POST_EDIT_FIELD_CHANGE = 'POST_EDIT_FIELD_CHANGE';
export const POST_EDIT_IS_PUBLIC_CHANGE = 'POST_EDIT_IS_PUBLIC_CHANGE';

export const POST_EDIT_START_ADD_PRODUCT = 'POST_EDIT_START_ADD_PRODUCT';
// changing of suggest text value, not chosing the item
export const POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE = 'POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE';
export const POST_EDIT_PRODUCT_BRAND_CHANGE = 'POST_EDIT_PRODUCT_BRAND_CHANGE';
export const POST_EDIT_PRODUCT_PRODUCT_CHANGE = 'POST_EDIT_PRODUCT_PRODUCT_CHANGE';
export const POST_EDIT_PRODUCT_COLOR_CHANGE = 'POST_EDIT_PRODUCT_COLOR_CHANGE';
export const POST_EDIT_PRODUCT_CANCEL = 'POST_EDIT_PRODUCT_CANCEL';
export const POST_EDIT_PRODUCT_SAVE = 'POST_EDIT_PRODUCT_SAVE';
export const POST_EDIT_PRODUCT_SAVE_SUCCESS = 'POST_EDIT_PRODUCT_SAVE_SUCCESS';
export const POST_EDIT_PRODUCT_SAVE_FAIL = 'POST_EDIT_PRODUCT_SAVE_FAIL';
export const POST_EDIT_PRODUCT_REMOVE = 'POST_EDIT_PRODUCT_REMOVE';
export const POST_EDIT_PRODUCT_REMOVE_SUCCESS = 'POST_EDIT_PRODUCT_REMOVE_SUCCESS';
export const POST_EDIT_PRODUCT_REMOVE_FAIL = 'POST_EDIT_PRODUCT_REMOVE_FAIL';

export const POST_EDIT_PART_NEW = 'POST_EDIT_PART_NEW';
export const POST_EDIT_PART_EDIT = 'POST_EDIT_PART_EDIT';
export const POST_EDIT_PART_CHANGE_FIELD = 'POST_EDIT_PART_CHANGE_FIELD';
export const POST_EDIT_PART_CHANGE_POSITION = 'POST_EDIT_PART_CHANGE_POSITION';
export const POST_EDIT_PART_SAVE = 'POST_EDIT_PART_SAVE';
export const POST_EDIT_PART_SAVE_SUCCESS = 'POST_EDIT_PART_SAVE_SUCCESS';
export const POST_EDIT_PART_SAVE_FAIL = 'POST_EDIT_PART_SAVE_FAIL';
export const POST_EDIT_PART_CANCEL = 'POST_EDIT_PART_CANCEL';
export const POST_EDIT_PART_REMOVE = 'POST_EDIT_PART_REMOVE';
export const POST_EDIT_PART_REMOVE_SUCCESS = 'POST_EDIT_PART_REMOVE_SUCCESS';
export const POST_EDIT_PART_REMOVE_FAIL = 'POST_EDIT_PART_REMOVE_FAIL';

export function postEditDataFetchedAction(data: PostEditPageData): PostEditPageDataFetchedAction {
    return {
        type: POST_EDIT_PAGE_DATA_FETCHED,
        payload: data,
    };
}

export const postEditFileChange = (file: File, url: string): PostEditFileChange => ({
    type: POST_EDIT_FILE_CHANGE,
    payload: {file, url},
});

export const postEditFieldChange = (name: PostEditFieldChangeName, value: string): PostEditFieldChange => ({
    type: POST_EDIT_FIELD_CHANGE,
    payload: {name, value},
});

export const postEditIsPublicChange = (value: boolean): PostEditIsPublicChange => ({
    type: POST_EDIT_IS_PUBLIC_CHANGE,
    payload: {value},
});

export function postEditStartAddProductAction(partId: PostPartId): PostEditStartAddProductAction {
    return {
        type: POST_EDIT_START_ADD_PRODUCT,
        payload: {partId},
    };
}

export function postEditProductFieldTextChangeAction(fieldName: string, value: string): PostEditProductFieldTextChangeAction {
    return {
        type: POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE,
        payload: {fieldName, value},
    };
}

// TODO: TypeScript
export function postEditProductBrandChangeAction(id: BrandId): any {
    return (dispatch) => {
        dispatch({
            type: POST_EDIT_PRODUCT_BRAND_CHANGE,
            payload: {id},
        })

        // TODO: move to api
        fetch(`/api/brand/${id}/products`)
            .then(response => response.json() as Promise<GetBrandProductsResponse>)
            .then(data => {
                dispatch(productsBaseDataFetchedAction(data.productBase));
                dispatch(brandProductsDataFetchedAction(data.brandProducts));
            });
    }
}

// TODO: TypeScript
export function postEditProductProductChangeAction(id: ProductId): any {
    return (dispatch) => {
        dispatch({
            type: POST_EDIT_PRODUCT_PRODUCT_CHANGE,
            payload: {id},
        });

        // TODO: move to api
        fetch(`/api/product/${id}/colors`)
            .then(response => response.json() as Promise<GetProductColorsResponse>)
            .then(data => {
                dispatch(productColorsDataFetchedAction(data.productColor));
                dispatch(productExtraDataFetchedAction(data.productExtra));
            });
    }
}

export function postEditProductColorChangeAction(colorId: ProductColorId): PostEditProductColorChangeAction {
    return {
        type: POST_EDIT_PRODUCT_COLOR_CHANGE,
        payload: {colorId},
    };
}

export function postEditProductCancelAction(): PostEditProductCancelAction {
    return {
        type: POST_EDIT_PRODUCT_CANCEL,
    };
}

export function postEditProductSaveAction(): any {
    return (dispatch, getState) => {
        dispatch({
            type: POST_EDIT_PRODUCT_SAVE,
        });

        const state: AppState = getState();
        const id = state.pagePostEdit.postEdit.id;

        const {editPostPartProduct} = state.pagePostEdit;

        savePostPartProduct(editPostPartProduct)
            .then(data => {
                const payload = {
                    postId: id,
                    postPartId: editPostPartProduct.postPartId,
                    productId: editPostPartProduct.productId,
                    productColorId: editPostPartProduct.productColorId,
                    postPartProductId: data.postPartProductId,
                };

                if (data.status === 'success') {
                    dispatch({
                        type: POST_EDIT_PRODUCT_SAVE_SUCCESS,
                        payload,
                    });
                } else {
                    dispatch({
                        type: POST_EDIT_PRODUCT_SAVE_FAIL,
                    });
                }
            });
    };
}

export const postEditProductRemoveAction = (postProductId: PostProductId): any => (dispatch, getState) => {
    const state: AppState = getState();
    const productId = state.postProduct.items[postProductId].productId;

    deletePostPartProduct(postProductId)
        .then(data => {
            if (data.status === 'success') {
                dispatch({
                    type: POST_EDIT_PRODUCT_REMOVE_SUCCESS,
                    payload: {
                        postProductId,
                        productId,
                    },
                });
            } else {
                dispatch({
                    type: POST_EDIT_PRODUCT_REMOVE_FAIL,
                });
            }
        });
}

export function postEditPartNewAction(): PostEditPartNewAction {
    return {
        type: POST_EDIT_PART_NEW,
    };
}

export function postEditPartEditAction(id: PostPartId): any {
    return (dispatch, getState) => {
        const state: AppState = getState();

        const postPart = state.postPart.items[id];

        dispatch({
            type: POST_EDIT_PART_EDIT,
            payload: postPart,
        });
    };
}

export function postEditPartChangeFieldAction(name: 'color' | 'title', value: string): PostEditPartChangeFieldAction {
    return {
        type: POST_EDIT_PART_CHANGE_FIELD,
        payload: {name, value},
    };
}

export function postEditPartChangePositionAction(position: Position): PostEditPartChangePositionAction {
    return {
        type: POST_EDIT_PART_CHANGE_POSITION,
        payload: {position},
    };
}

export function postEditPartSaveAction(): any {
    return (dispatch, getState) => {
        const state: AppState = getState();

        const postId = state.pagePostEdit.postEdit.id;
        const partData = state.pagePostEdit.editPostPart;

        if (partData === null) return;

        savePostPart(postId, partData)
            .then(data => {
                if (data.status === 'success') {
                    dispatch({
                        type: POST_EDIT_PART_SAVE_SUCCESS,
                        payload: {
                            data: {
                                ...partData,
                                id: data.partId,
                            },
                        },
                    });
                } else {
                    dispatch({
                        type: POST_EDIT_PART_SAVE_FAIL,
                    });
                }
            });
    }
}

export function postEditPartCancelAction(): PostEditPartCancelAction {
    return {
        type: POST_EDIT_PART_CANCEL,
    };
}

