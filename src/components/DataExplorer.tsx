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
import { setCharts } from '../store/charts/actions';

interface Props {
    apis?: EndpointProps[]
    schema?: ChartElementArray
}

const initialFetch = async (schema: ChartElementArray): Promise<ChartElementArray> => {
    const chartsToLoad = schema.filter(({ kind }) => kind === ChartKind.simple) as Chart[];
    const staticSchema = schema.filter(({ kind }) => kind !== ChartKind.simple)

    await Promise.all(
        chartsToLoad.map(el => el.apiEndpoint)
    ).then((results: Record<string, unknown>[]) => {
        for(let i = 0; i < chartsToLoad.length; i++) {
            chartsToLoad[i].data = results[i].items as Record<string, unknown>[];
        }
    });

    return [ ...staticSchema, ...chartsToLoad];
};

const DataExplorer: FunctionComponent<Props> = ({
    // apis = [], // for the form
    schema = [] // for the charts
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

    return (
        <React.Fragment>
            { schema === [] && 'No schema provided' }
            { loaded && data.length > 0 && <ChartRenderer /> }
        </React.Fragment>
    );
};

export default DataExplorer;
