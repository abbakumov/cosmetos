import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {blogReducer} from '../entities/Blog/reducer';

const rootReducer = combineReducers({
    blog: blogReducer,
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