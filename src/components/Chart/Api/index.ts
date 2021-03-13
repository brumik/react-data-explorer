import { ChartApiProps, ChartData, ChartDataKind, ChartGroupedData, ChartLegendData, ChartSimpleData } from '../types';
import { ApiReturnType, ApiType, GroupedApi } from './types';
export * from './types';

export const fetchApi = (api: ChartApiProps): Promise<ApiReturnType> => {
    const url = new URL(api.url);
    return fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify(api.params)
    }).then(r => r.json()) as Promise<ApiReturnType>;
}

export const convertGroupedByData = (data: GroupedApi): ChartGroupedData => {
    const { dates } = data;
    const items: ChartGroupedData = [];
    dates.forEach((el) => {
        el.items.forEach((item, idx) => {
            if (!items[idx]) {
                items[idx] = [];
            }
            items[idx].push({
                created_date: el.date,
                ...item
            });
        })
    });
    return items;
}

export const getApiData = async (api: ChartApiProps): Promise<ChartData> => {
    const resolvedData: ChartData = {
        data: [] as ChartSimpleData,
        kind: ChartDataKind.simple
    }

    await fetchApi(api).then((result: ApiReturnType) => {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        if (result['dates']) {
            result.type = ApiType.grouped
        } else {
            result.type = ApiType.nonGrouped
        }

        switch (result.type) {
            case ApiType.grouped:
                resolvedData.data = convertGroupedByData(result);
                resolvedData.kind = ChartDataKind.grouped
                break;
            case ApiType.nonGrouped:
                resolvedData.data = result.items;
                resolvedData.kind = ChartDataKind.simple
                break;
        }
    });

    return resolvedData;
};

export const getLegendData = (resolvedApi: ChartData): ChartLegendData => {
    switch (resolvedApi.kind) {
        case ChartDataKind.simple:
            const datapoint = resolvedApi.data as ChartSimpleData;
            return datapoint.map(({ name }) => ({ name: (name || 'No Name') as string }));
        case ChartDataKind.grouped:
            const datapoints = resolvedApi.data as ChartGroupedData;
            return datapoints.map(line => ({
                name: (line[0].name || 'No Name') as string
            }));
    }
};