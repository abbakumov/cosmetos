import {PostPartId} from '../../../../entities/PostPart/types';
import {
    PostEditPageDataFetchedAction,
    PostEditStartAddProductAction,
    PostEditProductFieldTextChangeAction,
    PostEditPageData,
} from './types';

export const POST_EDIT_PAGE_DATA_FETCHED = 'POST_EDIT_PAGE_DATA_FETCHED';
export const POST_EDIT_START_ADD_PRODUCT = 'POST_EDIT_START_ADD_PRODUCT';
// changing of suggest text value, not chosing the item
export const POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE = 'POST_EDIT_PRODUCT_FIELD_TEXT_CHANGE';
export const POST_EDIT_PRODUCT_BRAND_CHANGE = 'POST_EDIT_PRODUCT_BRAND_CHANGE';

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
export function postEditProductBrandChangeAction(fullName: string): any {
    return (dispatch, getState) => {
        const {items} = getState().brand;

        console.log('hi!')

        const brandId = parseInt(Object.keys(items).find(id => items[id].fullName === fullName))

        if (brandId) {
            dispatch({
                type: POST_EDIT_PRODUCT_BRAND_CHANGE,
                payload: {id: brandId},
            })
        } else {
            console.warn('Invalid fullName in postEditProductBrandChangeAction action creator');
        }
    }
}
