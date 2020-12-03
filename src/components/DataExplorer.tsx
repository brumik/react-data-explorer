import React, { FunctionComponent, useEffect, useState } from 'react';
import ChartRenderer from './Chart/';
import ChartCreator from './Form/';
import { dailyNoGroupBy, jobExplorerOptions } from './api';
import {
    ChartType,
    ReducerType
} from '../types';
import useDataReducer from './useDataReducer';
import { apiOptionsToFormOptions } from './helpers';

const DataExplorer: FunctionComponent<Record<string, unknown>> = () => {
    const [ state, dispatch ] = useDataReducer();
    const [ y, setY ] = useState('host_count');
    const [ yLabel, setYLabel ] = useState('');

    useEffect(() => {
        dispatch({
            type: ReducerType.setForm,
            payload: apiOptionsToFormOptions(jobExplorerOptions, dispatch)
        })
    }, [])

    useEffect(() => {
        const attr = state.form.find(i => i.name === 'attributes');
        if (attr) {
            setY(attr.value);
            setYLabel(attr.options.find(i => i.key === attr.value).value);
        }
    }, [ state.form ])

    return (
        <>
            <ChartCreator
                fields={state.form}
            />
            <ChartRenderer
                data={dailyNoGroupBy}
                chartType={ChartType.bar}
                x='created_date'
                xAxis={{
                    label: 'Days in the month'
                }}
                y={y}
                yAxis={{
                    label: yLabel
                }}
            />
        </>
    );
};

export default DataExplorer;
