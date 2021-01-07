import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ChartRenderer from './Chart/';
import {
    ChartKind,
    EndpointProps,
    ChartElementArray,
    Chart
} from '../types';
import {
    useTypedSelector
} from './helpers';
import { set as setCharts } from '../store/charts/actions';
import Form from './Form/';

interface Props {
    apis?: EndpointProps[]
    schema?: ChartElementArray,
    onSchemaChange?: (json: ChartElementArray) => void
}

const singleFetch = (baseUrl: string, body: Record<string, string | boolean>): Promise<unknown> => {
    const url = new URL(baseUrl);
    Object.keys(body).forEach(key => url.searchParams.append(key, body[key] as string));
    return fetch(url.toString()).then(r => r.json()) as Promise<unknown>;
}

const initialFetch = async (schema: ChartElementArray): Promise<ChartElementArray> => {
    const chartsToLoad = schema.filter(({ kind }) => kind === ChartKind.simple) as Chart[];
    const staticSchema = schema.filter(({ kind }) => kind !== ChartKind.simple)

    await Promise.all(
        chartsToLoad.map(el => singleFetch(el.apiEndpoint.url, el.apiParams))
    ).then((results: Record<string, unknown>[]) => {
        for(let i = 0; i < chartsToLoad.length; i++) {
            chartsToLoad[i].data = results[i].items as Record<string, unknown>[];
        }
    });

    return [ ...staticSchema, ...chartsToLoad];
};

const DataExplorer: FunctionComponent<Props> = ({
    // apis = [], // for the form
    schema = [], // for the charts
    onSchemaChange = () => ([])
}) => {
    const [ loaded, setLoaded ] = useState(false);
    const data = useTypedSelector(store => store.charts);
    const dispatchChart = useDispatch();

    useEffect(() => {
        if (schema === []) {
            return;
        }

        initialFetch(schema).then((fetched) => {
            dispatchChart(setCharts(fetched));
            setLoaded(true);
        }).catch(() => ({}));
    }, [])

    useEffect(() => {
        onSchemaChange(data.map(el => {
            if (el.kind === ChartKind.simple) {
                return { ...el, data: []}
            } else {
                return el;
            }
        }))
    }, [ data ])

    return (
        <React.Fragment>
            { loaded && data.length > 0 && <Form chartId={2} /> }
            { schema === [] && 'No schema provided' }
            { loaded && data.length > 0 && <ChartRenderer /> }
        </React.Fragment>
    );
};

export default DataExplorer;
