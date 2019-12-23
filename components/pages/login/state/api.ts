import fetch from 'isomorphic-fetch';

import {getOrigin} from '../../../../configs/location';

interface PostLoginSuccessResponse {
    status: 'success',
    isAdmin: boolean,
    login: string,
}

interface PostLoginFailResponse {
    status: 'fail',
}

export type PostLoginResponse =
    | PostLoginSuccessResponse
    | PostLoginFailResponse
    ;

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
