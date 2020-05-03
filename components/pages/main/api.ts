import fetchData from '../../../src/helpers/fetchData';
import {getOrigin} from '../../../configs/location';
import {ICosPageContext} from '../../../types/context';
import {BlogLogin, BlogsData} from '../../../entities/Blog/types';
import {BlogProductId, BlogProductMap} from '../../../entities/BlogProduct/types';
import {PostId} from '../../../entities/Post/types';
import {ProductBaseMap} from '../../../entities/ProductBase/types';
import {PostMap} from '../../../entities/Post/types';

interface GetMainResponse {
    blogLogins: BlogLogin[]
    blogProductIds: BlogProductId[]
    postIds: PostId[]
    blog: BlogsData
    productBase: ProductBaseMap
    blogProduct: BlogProductMap
    post: PostMap
}
export const getMain = (context: ICosPageContext): Promise<GetMainResponse> =>
    fetchData(
        `${getOrigin()}/api/main`,
        {},
        context
    );
