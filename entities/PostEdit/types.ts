import {PostId} from '../Post/types';

export interface PostEdit {
    // post is not saved yet if id is null
    id?: PostId;
    title: string;
    imageUrl: string;
    instaUrl: string;
    description: string;
}