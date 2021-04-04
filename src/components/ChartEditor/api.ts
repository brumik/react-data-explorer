import { ApiParams } from './types';

interface ApiSingleOption {
    key: string,
    value: string | number | boolean
}

export interface ApiReturnType {
    [x: string]: ApiSingleOption[]
}

// Fetch the options for the give api
export const fetchApi = (url: string, params: ApiParams): Promise<ApiReturnType> => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(params)
    }).then(r => r.json()) as Promise<ApiReturnType>;
}
