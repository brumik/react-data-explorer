import { ApiProps } from './Chart/types';

export const fetchApi = (api: ApiProps): Promise<unknown> => {
    const url = new URL(api.url);
    Object.keys(api.params).forEach(key => url.searchParams.append(key, api.params[key]));
    return fetch(url.toString()).then(r => r.json()) as Promise<unknown>;
}
