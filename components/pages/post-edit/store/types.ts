import {PostPartId, PostPart} from '../../../../entities/PostPart/types';
import {PostEdit} from '../../../../entities/PostEdit/types';
import {BrandId} from '../../../../entities/Brand/types';
import {ProductId} from '../../../../entities/ProductBase/types';
import {ProductColorId} from '../../../../entities/ProductColor/types';
import {FetchStatus} from '../../../../entities/FetchStatus';

import {
    POST_EDIT_PAGE_DATA_FETCHED,
    POST_EDIT_START_ADD_PRODUCT,
    POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE,
    POST_EDIT_PRODUCT_BRAND_CHANGE,
    POST_EDIT_PRODUCT_PRODUCT_CHANGE,
    POST_EDIT_PRODUCT_COLOR_CHANGE,
} from './actions';

export interface PagePostEditState {
    postEdit: PostEdit;
    // separate from postEdit for easier state management
    postPartIds: PostPartId[];
    editPostPart?: PostPart;
    // used for additing
    editPostPartProduct: {
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
    };
}

export interface PostEditPageData {
    postEdit: PostEdit;
    postPartIds: PostPartId[];
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

export type PagePostEditActionType =
    | PostEditPageDataFetchedAction
    | PostEditStartAddProductAction
    | PostEditProductFieldTextChangeAction
    | PostEditProductBrandChangeAction
    | PostEditProductProductChangeAction
    | PostEditProductColorChangeAction;
