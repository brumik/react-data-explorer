import React, { FunctionComponent, useEffect, useState } from 'react';
import ChartRenderer from './ChartRenderer';
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
                y={y}
            />
        </>
    );
};

export default DataExplorer;
