import fetchData from '../../src/helpers/fetchData';
import {getOrigin} from '../../configs/location';
import {ICosPageContext} from '../../types/context';

import {BlogExtra} from '../BlogExtra/types';
import {PostBase} from '../Post/types';

import {BlogMap, BlogLogin} from './types';

interface GetBlogByNameResponse {
    blog: {
        data: BlogMap
        currentLogin: BlogLogin
    }
    blogExtra: BlogExtra
    postsBase: {
        [id: number]: PostBase
    }
}

export function getBlogByName(name: string, context?: ICosPageContext): Promise<GetBlogByNameResponse> {
    return fetchData<GetBlogByNameResponse>(
        `${getOrigin()}/api/blog/${name}`,
        {},
        context
    );
}
