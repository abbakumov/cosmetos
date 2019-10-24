export function getOrigin(): string {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    }

    if (process.env.NODE_ENV === 'production') {
        return 'https://cosmetos.ru';
    }

    return 'http://127.0.0.1:3000';
}
