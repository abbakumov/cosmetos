import fetch from 'isomorphic-fetch';

import {Blog} from './types';

export function getBlogByName(name: string[]): Promise<Blog> {
    return fetch(`http://localhost:3000/api/blog/${name[0]}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json() as Promise<Blog>
        });
}
