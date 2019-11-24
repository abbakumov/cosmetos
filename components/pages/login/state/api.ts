import fetch from 'isomorphic-fetch';

import {getOrigin} from '../../../../configs/location';

export interface PostLoginResponse {
    status: 'success' | 'fail';
}
export function postLogin(username: string, password: string): Promise<PostLoginResponse> {
    return fetch(
        `${getOrigin()}/api/login`,
        {
            body: JSON.stringify({username, password}),
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }
    ).then(response => response.json());
}
