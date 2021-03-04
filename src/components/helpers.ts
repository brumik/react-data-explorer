import { ApiProps } from './Chart/types';

export const fetchApi = (api: ApiProps): Promise<unknown> => {
    const url = new URL(api.url);
    return fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify(api.params)
    }).then(r => r.json()) as Promise<unknown>;
}
