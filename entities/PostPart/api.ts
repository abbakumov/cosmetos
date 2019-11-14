import {getOrigin} from '../../configs/location';

import {PostId} from '../Post/types';

import {PostPartId, PostPart} from './types';

export interface SavePostPartResponse {
    status: string;
    partId: PostPartId;
}

export function savePostPart(postId: PostId, partData: PostPart): Promise<SavePostPartResponse> {
    return fetch(
        `${getOrigin()}/api/post/${postId}/part`,
        {
            method: 'POST',
            body: JSON.stringify(partData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<SavePostPartResponse>
            });
}

