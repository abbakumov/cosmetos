import {BlogLogin} from '../Blog/types';
import {PostId} from '../PostBase/types';

type BlogProductId = number;

export interface BlogProduct {
    id: BlogProductId;
    blogLogin: BlogLogin;
    postId: PostId;
    comment: string;
};
