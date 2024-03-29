import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {createScrollMiddleware} from 'react-redux-scroll';
import {composeWithDevTools} from 'redux-devtools-extension';
import {batchDispatchMiddleware} from 'redux-batched-actions';
import {routerReducer, createRouterMiddleware} from 'connected-next-router';

import {pageMainReducer} from '../components/pages/main/state/reducer';
import {pageBlogReducer} from '../components/pages/blog/state/reducer';
import {pagePostReducer} from '../components/pages/post/state/reducer';
import {pagePostEditReducer} from '../components/pages/post-edit/store/reducer';
import {pageLoginReducer} from '../components/pages/login/state/reducer';
import {pageProductReducer} from '../components/pages/product/state/reducer';
import {pageAdminUnProductsReducer} from '../components/pages/admin/products-unassigned/state/reducer';
import {pageAdminBrandsReducer} from '../components/pages/admin/brands/store/reducer';
import {pageAdminProductsReducer} from '../components/pages/admin/products/store/reducer';
import {pageAdminProductReducer} from '../components/pages/admin/product/store/reducer';

import {blogReducer} from '../entities/Blog/reducer';
import {blogExtraReducer} from '../entities/BlogExtra/reducer';
import {postBaseReducer} from '../entities/Post/reducer';
import {postExtraReducer} from '../entities/PostExtra/reducer';
import {blogProductReducer} from '../entities/BlogProduct/reducer';
import {postPartProductReducer} from '../entities/PostPartProduct/reducer';
import {postPartReducer} from '../entities/PostPart/reducer';
import {productBaseReducer} from '../entities/ProductBase/reducer';
import {productExtraReducer} from '../entities/ProductExtra/reducer';
import {productColorReducer} from '../entities/ProductColor/reducer';
import {unProductReducer} from '../entities/UnProduct/reducer';
import {unProductExtraReducer} from '../entities/UnProductExtra/reducer';
import {brandReducer} from '../entities/Brand/reducer';
import {brandProductsReducer} from '../entities/BrandProducts/reducer';
import {notificationReducer} from '../entities/Notification/reducer';

const rootReducer = combineReducers({
    router: routerReducer,

    // pages
    pageMain: pageMainReducer,
    pageBlog: pageBlogReducer,
    pagePost: pagePostReducer,
    pagePostEdit: pagePostEditReducer,
    pageLogin: pageLoginReducer,
    pageProduct: pageProductReducer,
    pageAdminBrands: pageAdminBrandsReducer,
    pageAdminProducts: pageAdminProductsReducer,
    pageAdminProduct: pageAdminProductReducer,
    pageAdminUnProducts: pageAdminUnProductsReducer,

    // entities
    blog: blogReducer,
    blogExtra: blogExtraReducer,

    postBase: postBaseReducer,
    postExtra: postExtraReducer,

    productBase: productBaseReducer,
    productExtra: productExtraReducer,

    blogProduct: blogProductReducer,

    postPartProduct: postPartProductReducer,

    postPart: postPartReducer,

    productColor: productColorReducer,

    unProduct: unProductReducer,
    unProductExtra: unProductExtraReducer,

    brand: brandReducer,

    brandProducts: brandProductsReducer,

    notification: notificationReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const getMiddlewares = () => applyMiddleware(
    thunk,
    batchDispatchMiddleware,
    createScrollMiddleware(),
    // createRouterMiddleware(),
);

export const makeStore = (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(getMiddlewares())
    );
};
