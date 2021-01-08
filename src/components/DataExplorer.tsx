import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ChartRenderer from './Chart/';
import {
    ChartKind,
    ChartElement,
    ApiProps,
    Chart
} from './Chart/types';
import { useTypedSelector } from '../store/';
import { set as setCharts } from '../store/charts/actions';
import Form from './Form/';
import { fetchApi } from './helpers';

interface Props {
    apis?: ApiProps[]
    schema?: ChartElement[],
    onSchemaChange?: (json: ChartElement[]) => void
}

const initialFetch = async (schema: ChartElement[]): Promise<ChartElement[]> => {
    const chartsToLoad = schema.filter(({ kind }) => kind === ChartKind.simple) as Chart[];
    const staticSchema = schema.filter(({ kind }) => kind !== ChartKind.simple)

    await Promise.all(
        chartsToLoad.map(el => fetchApi(el.api))
    ).then((results: Record<string, unknown>[]) => {
        for(let i = 0; i < chartsToLoad.length; i++) {
            chartsToLoad[i].props.data = results[i].items as Record<string, unknown>[];
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
