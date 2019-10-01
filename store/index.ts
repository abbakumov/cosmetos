import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {createScrollMiddleware} from 'react-redux-scroll';
import {composeWithDevTools} from 'redux-devtools-extension';

import {pagePostReducer} from '../components/pages/post/state/reducer';
import {pageLoginReducer} from '../components/pages/login/state/reducer';
import {pageAdminProductsUnassignedReducer}
    from '../components/pages/admin/products-unassigned/state/reducer';

import {blogReducer} from '../entities/Blog/reducer';
import {postBaseReducer} from '../entities/PostBase/reducer';
import {postExtraReducer} from '../entities/PostExtra/reducer';
import {blogProductReducer} from '../entities/BlogProduct/reducer';
import {postPartReducer} from '../entities/PostPart/reducer';
import {productBaseReducer} from '../entities/ProductBase/reducer';
import {productExtraReducer} from '../entities/ProductExtra/reducer';
import {productColorReducer} from '../entities/ProductColor/reducer';
import {unProductReducer} from '../entities/UnProduct/reducer';
import {brandReducer} from '../entities/Brand/reducer';

const rootReducer = combineReducers({
    // pages
    pagePost: pagePostReducer,
    pageLogin: pageLoginReducer,
    pageAdminProductsUnassigned: pageAdminProductsUnassignedReducer,

    // entities
    blog: blogReducer,
    postBase: postBaseReducer,
    postExtra: postExtraReducer,
    blogProduct: blogProductReducer,
    postPart: postPartReducer,
    productBase: productBaseReducer,
    productExtra: productExtraReducer,
    productColor: productColorReducer,
    unProduct: unProductReducer,
    brand: brandReducer,
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
