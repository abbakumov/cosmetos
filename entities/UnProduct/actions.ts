import {notificationShowErrorAction} from '../Notification/actions';
import {PostPartProductId} from '../PostPartProduct/types';

import {
    UnProductMap,
    UnProductsDataFetchedAction,
    UnProductRemoveSuccessAction,
    UnProductRemoveFailAction,
    UnProductId,
} from './types';

import {deleteUnProduct} from './api';

export const UN_PRODUCTS_DATA_FETCHED = 'UN_PRODUCTS_DATA_FETCHED';
export const UN_PRODUCT_REMOVE_SUCCESS = 'UN_PRODUCT_REMOVE_SUCCESS';
export const UN_PRODUCT_REMOVE_FAIL = 'UN_PRODUCT_REMOVE_FAIL';

export const unProductsDataFetchedAction = (data: UnProductMap): UnProductsDataFetchedAction => ({
    type: UN_PRODUCTS_DATA_FETCHED,
    payload: {data},
});

export const unProductRemoveAction = (id: UnProductId) => async (dispatch) => {
    try {
        const {status, postPartProductId} = await deleteUnProduct(id);
        if (status === 'success') {
            dispatch(unProductRemoveSuccessAction(id, postPartProductId));
        } else {
            throw new Error();
        }
    } catch (e) {
        dispatch(unProductRemoveFailAction(id));
        dispatch(notificationShowErrorAction('Не удалось удалить продукт'));
    }
}

const unProductRemoveSuccessAction
    = (id: UnProductId, postPartProductId: PostPartProductId): UnProductRemoveSuccessAction => ({
        type: UN_PRODUCT_REMOVE_SUCCESS,
        payload: {id, postPartProductId},
    });

const unProductRemoveFailAction = (id: UnProductId): UnProductRemoveFailAction => ({
    type: UN_PRODUCT_REMOVE_FAIL,
    payload: {id},
});
