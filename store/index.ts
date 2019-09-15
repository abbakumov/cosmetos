import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {blogReducer} from '../entities/Blog/reducer';
import {postBaseReducer} from '../entities/PostBase/reducer';
import {postExtraReducer} from '../entities/PostExtra/reducer';
import {blogProductReducer} from '../entities/BlogProduct/reducer';
import {postPartReducer} from '../entities/PostPart/reducer';
import {productBaseReducer} from '../entities/ProductBase/reducer';

const rootReducer = combineReducers({
    blog: blogReducer,
    postBase: postBaseReducer,
    postExtra: postExtraReducer,
    blogProduct: blogProductReducer,
    postPart: postPartReducer,
    productBase: productBaseReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const makeStore = (initialState) => {
    console.log('store initialState: ', initialState);

    return createStore(
        rootReducer,
        initialState, 
        composeWithDevTools(applyMiddleware(thunk))
    );
};
