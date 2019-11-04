import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {createScrollMiddleware} from 'react-redux-scroll';
import {composeWithDevTools} from 'redux-devtools-extension';

import {pagePostReducer} from '../components/pages/post/state/reducer';
import {pagePostEditReducer} from '../components/pages/post-edit/store/reducer';
import {pageLoginReducer} from '../components/pages/login/state/reducer';
import {pageAdminProductsUnassignedReducer}
    from '../components/pages/admin/products-unassigned/state/reducer';
import {pageAdminBrandsReducer} from '../components/pages/admin/brands/store/reducer';
import {pageAdminProductsReducer} from '../components/pages/admin/products/store/reducer';

import {blogReducer} from '../entities/Blog/reducer';
import {blogExtraReducer} from '../entities/BlogExtra/reducer';
import {postBaseReducer} from '../entities/Post/reducer';
import {postExtraReducer} from '../entities/PostExtra/reducer';
import {blogProductReducer} from '../entities/BlogProduct/reducer';
import {postProductReducer} from '../entities/PostProduct/reducer';
import {postPartReducer} from '../entities/PostPart/reducer';
import {productBaseReducer} from '../entities/ProductBase/reducer';
import {productExtraReducer} from '../entities/ProductExtra/reducer';
import {productColorReducer} from '../entities/ProductColor/reducer';
import {unProductReducer} from '../entities/UnProduct/reducer';
import {brandReducer} from '../entities/Brand/reducer';
import {brandProductsReducer} from '../entities/BrandProducts/reducer';

const rootReducer = combineReducers({
    // pages
    pagePost: pagePostReducer,
    pagePostEdit: pagePostEditReducer,
    pageLogin: pageLoginReducer,
    pageAdminProductsUnassigned: pageAdminProductsUnassignedReducer,
    pageAdminBrands: pageAdminBrandsReducer,
    pageAdminProducts: pageAdminProductsReducer,

    // entities
    blog: blogReducer,
    blogExtra: blogExtraReducer,

    postBase: postBaseReducer,
    postExtra: postExtraReducer,

    productBase: productBaseReducer,
    productExtra: productExtraReducer,

    blogProduct: blogProductReducer,

    postProduct: postProductReducer,

    postPart: postPartReducer,

    productColor: productColorReducer,

    unProduct: unProductReducer,

    brand: brandReducer,

    brandProducts: brandProductsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const getMiddlewares = () => applyMiddleware(
    thunk,
    createScrollMiddleware()
);

export const makeStore = (initialState) => {
    console.log('store initialState: ', initialState);

    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(getMiddlewares())
    );
};
