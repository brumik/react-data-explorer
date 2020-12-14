import React, { FunctionComponent, useEffect, useState } from 'react';
import ChartRenderer from './Chart/';
import ChartCreator from './Form/';
import { dailyNoGroupByPromise, jobExplorerOptions } from './api';
import {
    ChartType,
    ReducerType,
    ChartKind,
    EndpointProps,
    ChartElementArray
} from '../types';
import useDataReducer from './useDataReducer';
import { apiOptionsToFormOptions } from './helpers';
import { ChartElementsProvider } from './ChartElementsContext'
import useChartElementStore from './useChartElementStore';


const chartTest = (data: Record<string, unknown>[], y: string, yLabel: string): ChartElementArray => ([
    {
        id: 1,
        kind: ChartKind.wrapper,
        parent: null as number,
        children: [2],
        xAxis: {
            label: 'Days in the month'
        },
        yAxis: {
            label: yLabel
        }
    },
    {
        id: 2,
        kind: ChartKind.simple,
        parent: 1,
        children: [],
        data,
        type: ChartType.line,
        x: 'created_date',
        y
    },
    {
        id: 3,
        kind: ChartKind.wrapper,
        parent: null as number,
        children: [4],
        xAxis: {
            label: 'Days in the month'
        },
        yAxis: {
            label: yLabel
        }
    },
    {
        id: 4,
        kind: ChartKind.simple,
        parent: 3,
        children: [],
        data,
        type: ChartType.bar,
        x: 'created_date',
        y
    }
]);


interface Props {
    apis?: EndpointProps[]
    schema?: ChartElementArray
}

const DataExplorer: FunctionComponent<Props> = ({
    // apis = [], // for the form
    schema = [] // for the charts
}) => {
    const [ state, dispatch ] = useDataReducer();
    const [ y, setY ] = useState('host_count');
    const [ yLabel, setYLabel ] = useState('Host Count');
    const [ loaded, setLoaded ] = useState(false);
    const { data, reInitCharts } = useChartElementStore(schema);

    useEffect(() => {
        dispatch({
            type: ReducerType.setForm,
            payload: apiOptionsToFormOptions(jobExplorerOptions, dispatch)
        });
    }, [])

    useEffect(() => {
        setLoaded(false);
        const attr = state.form.find(i => i.name === 'attributes');
        if (attr) {
            setY(attr.value);
            setYLabel(attr.options.find(i => i.key === attr.value).value);

            dailyNoGroupByPromise.then(
                (d: []) => {
                    reInitCharts(chartTest(d, y, yLabel));
                    setLoaded(true);
                },
                () => ({})
            );
        }
    }, [ state.form ])

    return (
        <ChartElementsProvider value={data}>
            <ChartCreator
                fields={state.form}
            />
            { loaded && data.length > 0 && <ChartRenderer /> }
        </ChartElementsProvider>
    );
};

export default DataExplorer;
