import {BlogState} from '../entities/Blog/types';
import {PostBaseState} from '../entities/PostBase/types';

export interface StoreState {
    blog: BlogState;
    postBase: PostBaseState;
};
