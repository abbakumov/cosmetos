import fetch from 'isomorphic-fetch';

import {ICosPageContext} from '../../types/context';

export default function fetchData<ResponseType>(url: string, options: RequestInit = {}, context?: ICosPageContext) {
    const isServer = typeof window === 'undefined';

    let fetchOptions: RequestInit = options;

    if (isServer && context) {
        const reqHeaders = context.req.headers || {};
        const optionsHeaders = options.headers || {};
    
        const serverHeaders: HeadersInit = {
            // passing all user headers to server
            // very useful for cookies and other stuff
            ...reqHeaders,
            ...optionsHeaders,
        } as HeadersInit;

        if (process.env.NODE_ENV === 'production') {
            serverHeaders['Host'] = 'cosmetos.online';
        }

        fetchOptions = {
            ...options,
            headers: serverHeaders,
        };
    }

    return fetch(
        url,
        fetchOptions
    ).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return response.json() as Promise<ResponseType>
    });
}
