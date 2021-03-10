import { ApiProps } from './Chart/types';

export enum ApiType {
    nonGrouped = 'nonGrouped',
    grouped = 'grouped'
}

export interface NonGroupedApi {
    type: ApiType.nonGrouped,
    items: Record<string, unknown>[]
    response_type: string
}

export interface GroupedApi {
    type: ApiType.grouped,
    dates: {
        date: string,
        items: Record<string, unknown>[]
    }[],
    meta: any,
    response_type: string
}

export type ApiReturnType = NonGroupedApi | GroupedApi;

export const fetchApi = (api: ApiProps): Promise<ApiReturnType> => {
    const url = new URL(api.url);
    return fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify(api.params)
    }).then(r => r.json()) as Promise<ApiReturnType>;
}
