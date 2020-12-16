import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { apiOptionsToFormOptions, useTypedSelector } from './helpers';
import { setCharts } from '../store/charts/actions';

import Vchart from './ComparisonComp';

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
        kind: ChartKind.group,
        parent: 3,
        children: [5, 6]
    },
    {
        id: 5,
        kind: ChartKind.simple,
        parent: 4,
        children: [],
        data,
        type: ChartType.bar,
        x: 'created_date',
        y
    },
    {
        id: 6,
        kind: ChartKind.simple,
        parent: 4,
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
    // schema = [] // for the charts
}) => {
    const [ state, dispatch ] = useDataReducer();
    const [ y, setY ] = useState('host_count');
    const [ yLabel, setYLabel ] = useState('Host Count');
    const [ loaded, setLoaded ] = useState(false);
    const data = useTypedSelector(store => store.charts);
    const dispatch2 = useDispatch();
    const [ s, setS ] = useState([]);

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
                    dispatch2(setCharts(chartTest(d, y, yLabel)));
                    setS(d);
                    setLoaded(true);
                },
                () => ({})
            );
        }
    }, [ state.form ])

    return (
        <React.Fragment>
            <ChartCreator
                fields={state.form}
            />
            { loaded && data.length > 0 && <ChartRenderer /> }
            { loaded && <Vchart data={s} /> }
        </React.Fragment>
    );
};

export default DataExplorer;
