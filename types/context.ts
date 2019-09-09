import {NextPageContext} from 'next';
import {Store} from 'redux';

export interface ICosPageContext extends NextPageContext {
    store: Store;
};
