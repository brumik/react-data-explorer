import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    ChartElement, DataKind, DataType, GroupedApiDataFormat, PropFunctions
} from './types';
import CreateWrapper from './createWrapper';
import { ApiReturnType, ApiType, fetchApi, GroupedApi } from '../helpers';

interface Props {
    ids?: number[],
    data: DataType
}

const convertGroupedByData = (data: GroupedApi): GroupedApiDataFormat => {
    const { dates } = data;
    const items: GroupedApiDataFormat = [];
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

const initialFetch = async (schema: ChartElement[]): Promise<ChartElement[]> => {
    const chartsToLoad = schema.filter(el => el.api);
    const staticSchema = schema.filter(el => !el.api)


    await Promise.all(
        chartsToLoad.map(el => fetchApi(el.api))
    ).then((results: ApiReturnType[]) => {
        results.forEach((result, idx) => {
            // eslint-disable-next-line @typescript-eslint/dot-notation
            if(result['dates']) {
                result.type = ApiType.grouped
            } else {
                result.type = ApiType.nonGrouped
            }

            switch(result.type) {
                case ApiType.grouped:
                    chartsToLoad[idx].api.data = convertGroupedByData(result);
                    chartsToLoad[idx].api.dataKind = DataKind.grouped
                    break;
                case ApiType.nonGrouped:
                    chartsToLoad[idx].api.data = result.items;
                    chartsToLoad[idx].api.dataKind = DataKind.simple
                    break;
            }
        });
    });

    return [...staticSchema, ...chartsToLoad];
};


const ChartRenderer: FunctionComponent<Props> = ({
    ids = [] as number[],
    data = {
        charts: [] as ChartElement[],
        functions: {} as PropFunctions
    }
}) => {
    const [loaded, setLoaded] = useState(false);
    const [fetched, setFetched] = useState([] as ChartElement[]);

    const getCharts = (c: ChartElement[]) => {
        if (ids.length > 0) {
            return c.filter(({ id }) => ids.includes(id)).sort((a,b) => a.id - b.id);
        } else {
            return c.filter(({ parent }) => parent === null).sort((a,b) => a.id - b.id);
        }
    }

    useEffect(() => {
        initialFetch(data.charts).then((initialized) => {
            setFetched(initialized);
            setLoaded(true);
        }).catch(() => ({}));
    }, [ data ])

    return (
        <React.Fragment>
            { loaded && getCharts(fetched).map(el =>
                (<CreateWrapper
                    id={el.id}
                    key={el.id}
                    data={{ ...data, charts: fetched }}
                />)
            )}
        </React.Fragment>
    );
}

export default ChartRenderer;
