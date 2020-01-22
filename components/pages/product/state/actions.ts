import {PostId} from '../../../../entities/Post/types';

import {
    PageProductDataFetchedAction,
} from './types';

export const PAGE_PRODUCT_DATA_FETCHED = 'PAGE_PRODUCT_DATA_FETCHED';

export const pageProductDataFetchedAction = (refPost: PostId): PageProductDataFetchedAction => ({
    type: PAGE_PRODUCT_DATA_FETCHED,
    payload: {refPost},
});
