import {PostPartId} from '../../../../entities/PostPart/types';
import {GetBrandProductsResponse} from '../../../../entities/BrandProducts/api';
import {GetProductColorsResponse} from '../../../../entities/ProductBase/api';
import {
    PostEditPageDataFetchedAction,
    PostEditStartAddProductAction,
    PostEditProductFieldTextChangeAction,
    PostEditProductColorChangeAction,
    PostEditPageData,
} from './types';
import {brandProductsDataFetchedAction} from '../../../../entities/BrandProducts/actions';
import {productsBaseDataFetchedAction} from '../../../../entities/ProductBase/actions';
import {productColorsDataFetchedAction} from '../../../../entities/ProductColor/actions';
import {productExtraDataFetchedAction} from '../../../../entities/ProductExtra/actions';
import {ProductColorId} from '../../../../entities/ProductColor/types';
import {BrandId} from '../../../../entities/Brand/types';
import {ProductId} from '../../../../entities/ProductBase/types';

export const POST_EDIT_PAGE_DATA_FETCHED = 'POST_EDIT_PAGE_DATA_FETCHED';
export const POST_EDIT_START_ADD_PRODUCT = 'POST_EDIT_START_ADD_PRODUCT';
// changing of suggest text value, not chosing the item
export const POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE = 'POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE';
export const POST_EDIT_PRODUCT_BRAND_CHANGE = 'POST_EDIT_PRODUCT_BRAND_CHANGE';
export const POST_EDIT_PRODUCT_PRODUCT_CHANGE = 'POST_EDIT_PRODUCT_PRODUCT_CHANGE';
export const POST_EDIT_PRODUCT_COLOR_CHANGE = 'POST_EDIT_PRODUCT_COLOR_CHANGE';

export function postEditDataFetchedAction(data: PostEditPageData): PostEditPageDataFetchedAction {
    return {
        type: POST_EDIT_PAGE_DATA_FETCHED,
        payload: data,
    };
}

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
