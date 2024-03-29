import {LocationChangeAction} from 'connected-next-router/actions';

import {PostPartId, PostPart} from '../../../../entities/PostPart/types';
import {PostEdit} from '../../../../entities/PostEdit/types';
import {BrandId} from '../../../../entities/Brand/types';
import {ProductId} from '../../../../entities/ProductBase/types';
import {ProductColorId} from '../../../../entities/ProductColor/types';
import {PostId} from '../../../../entities/Post/types';
import {PostPartProductId} from '../../../../entities/PostPartProduct/types';
import {Position} from '../../../../entities/Position';
import {UnProductId} from '../../../../entities/UnProduct/types';

import {
    POST_EDIT_PAGE_DATA_FETCHED,
    POST_EDIT_FILE_CHANGE,
    POST_EDIT_FIELD_CHANGE,
    POST_EDIT_IS_PUBLIC_CHANGE,
    POST_EDIT_SAVE,
    POST_EDIT_SAVE_SUCCESS,
    POST_EDIT_SAVE_FAIL,
    POST_EDIT_START_ADD_PRODUCT,
    POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE,
    POST_EDIT_PRODUCT_BRAND_CHANGE,
    POST_EDIT_PRODUCT_PRODUCT_CHANGE,
    POST_EDIT_PRODUCT_COLOR_CHANGE,
    POST_EDIT_PRODUCT_CANCEL,
    POST_EDIT_PRODUCT_SAVE,
    POST_EDIT_PRODUCT_SAVE_SUCCESS_AS,
    POST_EDIT_PRODUCT_SAVE_SUCCESS_UN,
    POST_EDIT_PRODUCT_SAVE_FAIL,
    POST_EDIT_PRODUCT_REMOVE_SUCCESS,
    POST_EDIT_PRODUCT_REMOVE_FAIL,
    POST_EDIT_PART_NEW,
    POST_EDIT_PART_CHANGE_FIELD,
    POST_EDIT_PART_CHANGE_POSITION,
    POST_EDIT_PART_SAVE,
    POST_EDIT_PART_SAVE_SUCCESS,
    POST_EDIT_PART_SAVE_FAIL,
    POST_EDIT_PART_CANCEL,
    POST_EDIT_PART_REMOVE,
    POST_EDIT_PART_REMOVE_SUCCESS,
    POST_EDIT_PART_REMOVE_FAIL,
    POST_EDIT_PART_EDIT,
} from './actions';

export interface EditPostPartProduct {
    postPartId?: PostPartId;
    // in each next section there can be only text(not selected item) or id of selected item:

    // BRAND
    brandText: string;
    brandId?: BrandId;
    // TODO: use statuses!
    // brandProductsFetchStatus: {
    //     [id: number]: FetchStatus;
    // }

    // PRODUCT
    productText: string;
    productId?: ProductId;
    // productExtra contains all colors
    // productExtraFetchStatus: {
    //     [id: number]: FetchStatus;
    // }

    // PRODUCT COLOR
    productColorText: string;
    productColorId?: ProductColorId;
    isSaving: boolean;
}

export interface PagePostEditState {
    postEdit: PostEdit;
    isSaving: boolean;
    // separate from postEdit for easier state management
    postPartIds: PostPartId[];
    editPostPart?: PostPart;
    editPostPartIsSaving: boolean;
    // used for additing
    editPostPartProduct: EditPostPartProduct;
}

export interface PostEditPageData {
    postEdit: PostEdit;
    postPartIds: PostPartId[];
}

export interface PostEditFileChange {
    type: typeof POST_EDIT_FILE_CHANGE;
    payload: {
        file: File;
        url: string;
    };
}

export type PostEditFieldChangeName = 'title' | 'instaPostId' | 'description';
export interface PostEditFieldChange {
    type: typeof POST_EDIT_FIELD_CHANGE;
    payload: {
        name: PostEditFieldChangeName;
        value: string;
    };
}

export interface PostEditIsPublicChange {
    type: typeof POST_EDIT_IS_PUBLIC_CHANGE;
    payload: {
        value: boolean;
    };
}

export interface PostEditSave {
    type: typeof POST_EDIT_SAVE;
}

export interface PostEditSaveSuccess {
    type: typeof POST_EDIT_SAVE_SUCCESS;
}

export interface PostEditSaveFail {
    type: typeof POST_EDIT_SAVE_FAIL;
}

export interface PostEditPageDataFetchedAction {
    type: typeof POST_EDIT_PAGE_DATA_FETCHED;
    payload: PostEditPageData;
}

export interface PostEditStartAddProductAction {
    type: typeof POST_EDIT_START_ADD_PRODUCT;
    payload: {
        partId: PostPartId;
    };
}

export interface PostEditProductFieldTextChangeAction {
    type: typeof POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE;
    payload: {
        fieldName: string;
        value: string;
    };
}

export interface PostEditProductBrandChangeAction {
    type: typeof POST_EDIT_PRODUCT_BRAND_CHANGE;
    payload: {
        id: BrandId;
    };
}

export interface PostEditProductProductChangeAction {
    type: typeof POST_EDIT_PRODUCT_PRODUCT_CHANGE;
    payload: {
        id: ProductId;
    }
}

export interface PostEditProductColorChangeAction {
    type: typeof POST_EDIT_PRODUCT_COLOR_CHANGE;
    payload: {
        colorId: ProductColorId;
    }
}

export interface PostEditProductCancelAction {
    type: typeof POST_EDIT_PRODUCT_CANCEL;
}

export interface PostEditProductSaveAction {
    type: typeof POST_EDIT_PRODUCT_SAVE;
}

export interface PostEditProductSaveSuccessAsAction {
    type: typeof POST_EDIT_PRODUCT_SAVE_SUCCESS_AS
    payload: {
        postId: PostId
        postPartId: PostPartId
        productId: ProductId
        productColorId?: ProductColorId
        postPartProductId: PostPartProductId
    };
}

export interface PostEditProductSaveSuccessUnAction {
    type: typeof POST_EDIT_PRODUCT_SAVE_SUCCESS_UN
    payload: {
        postId: PostId
        postPartId: PostPartId
        postPartProductId: PostPartProductId
        unProductId: UnProductId
        brandId?: BrandId
        brandText?: string
        productId?: ProductId
        productText?: string
        productColorText?: string
    };
}

export interface PostEditProductSaveFailAction {
    type: typeof POST_EDIT_PRODUCT_SAVE_FAIL;
}

export interface PostEditProductRemoveSuccess {
    type: typeof POST_EDIT_PRODUCT_REMOVE_SUCCESS;
    payload: {
        postPartProductId: PostPartProductId
        productId: ProductId
    };
}

export interface PostEditProductRemoveFail {
    type: typeof POST_EDIT_PRODUCT_REMOVE_FAIL;
}

export interface PostEditPartNewAction {
    type: typeof POST_EDIT_PART_NEW;
}

export interface PostEditPartEditAction {
    type: typeof POST_EDIT_PART_EDIT;
    payload: PostPart;
}

export interface PostEditPartChangeFieldAction {
    type: typeof POST_EDIT_PART_CHANGE_FIELD;
    payload: {
        name: 'color' | 'title',
        value: string,
    },
}

export interface PostEditPartChangePositionAction {
    type: typeof POST_EDIT_PART_CHANGE_POSITION;
    payload: {
        position: Position;
    };
}

export interface PostEditPartSaveAction {
    type: typeof POST_EDIT_PART_SAVE;
}

export interface PostEditPartSaveSuccessAction {
    type: typeof POST_EDIT_PART_SAVE_SUCCESS;
    payload: {
        data: PostPart;
    };
}

export interface PostEditPartSaveFailAction {
    type: typeof POST_EDIT_PART_SAVE_FAIL;
}

export interface PostEditPartCancelAction {
    type: typeof POST_EDIT_PART_CANCEL;
}

export interface PostEditPartRemoveAction {
    type: typeof POST_EDIT_PART_REMOVE;
}

export interface PostEditPartRemoveSuccessAction {
    type: typeof POST_EDIT_PART_REMOVE_SUCCESS;
    payload: {
        postPartId: PostPartId;
    };
}

export interface PostEditPartRemoveFailAction {
    type: typeof POST_EDIT_PART_REMOVE_FAIL;
}


export type PagePostEditActionType =
    | PostEditPageDataFetchedAction
    | PostEditFileChange
    | PostEditFieldChange
    | PostEditIsPublicChange
    | PostEditSave
    | PostEditSaveSuccess
    | PostEditSaveFail
    | PostEditStartAddProductAction
    | PostEditProductFieldTextChangeAction
    | PostEditProductBrandChangeAction
    | PostEditProductProductChangeAction
    | PostEditProductColorChangeAction
    | PostEditProductCancelAction
    | PostEditProductSaveAction
    | PostEditProductSaveSuccessAsAction
    | PostEditProductSaveSuccessUnAction
    | PostEditProductSaveFailAction
    | PostEditProductRemoveSuccess
    | PostEditProductRemoveFail
    | PostEditPartNewAction
    | PostEditPartEditAction
    | PostEditPartChangeFieldAction
    | PostEditPartChangePositionAction
    | PostEditPartSaveAction
    | PostEditPartSaveSuccessAction
    | PostEditPartSaveFailAction
    | PostEditPartCancelAction
    | PostEditPartRemoveAction
    | PostEditPartRemoveSuccessAction
    | PostEditPartRemoveFailAction
    | LocationChangeAction
    ;
