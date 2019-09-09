import fetch from 'isomorphic-fetch';

export function getBlogByName(name: string[]): {} {
    return fetch(`http://localhost:3000/api/blog/${name[0]}`)
        .then((response: Response) => response.json());
}
