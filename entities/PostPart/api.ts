import {getOrigin} from '../../configs/location';

import {PostId} from '../Post/types';

import {PostPartId, PostPart} from './types';

export interface SavePostPartResponse {
    status: string;
    partId: PostPartId;
}

export function savePostPart(postId: PostId, partData: PostPart): Promise<SavePostPartResponse> {
    return fetch(
        `${getOrigin()}/api/post/${postId}/save-part`,
        {
            method: 'POST',
            body: JSON.stringify(partData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<SavePostPartResponse>
            });
}

