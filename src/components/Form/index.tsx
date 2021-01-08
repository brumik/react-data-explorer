import React, { FunctionComponent, useEffect } from 'react';
import { Card, CardTitle, CardBody } from '@patternfly/react-core';
import Select from './Select';
import { FormOption } from './types';
import { Chart, ChartType } from '../Chart/types';
import { useTypedSelector } from '../../store/';
import { apiOptionsToFormOptions } from './helpers'
import { useDispatch } from 'react-redux';
import { updateChart } from '../../store/charts/actions';
import { set as setForm, setOptionValue } from '../../store/form/actions';
import { fetchApi } from '../helpers';

interface PropType {
    chartId: number,
    fields?: FormOption[],
}

const options = {
    apis: [
        {
            key: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
            value: 'Job Explorer'
        }
    ],
    groupByTime: [
        {
            key: 'true',
            value: 'Group By Time'
        },
        {
            key: 'false',
            value: 'Don\'t Group By Time'
        }
    ],
    chartTypes: [
        {
            key: ChartType.bar,
            value: 'Bar Chart'
        },
        {
            key: ChartType.line,
            value: 'Line Chart'
        },
        {
            key: ChartType.pie,
            value: 'Pie Chart'
        }
    ],
    attributes: [
        {
            key: 'host_count',
            value: 'Host count'
        },
        {
            key: 'failed_host_count',
            value: 'Failed host count'
        },
        {
            key: 'unreachable_host_count',
            value: 'Unreachable host count'
        },
        {
            key: 'average_elapsed_per_host',
            value: 'Average elapsed time per host'
        },
        {
            key: 'average_host_task_count_per_host',
            value: 'Average tasks count per host'
        }
    ]
}

const Form: FunctionComponent<PropType> = ({ chartId }) => {
    const dispatch = useDispatch();
    const state = useTypedSelector(store => store.form);

    const chart = useTypedSelector(store =>
        store.charts.find(({ id }) => id === chartId) as Chart);

    const getField = (n: string) =>
        state.length > 0
            ? state.find(({ name }) => name === n)
            : { value: '' };

    useEffect(() => {
        dispatch(
            setForm(apiOptionsToFormOptions(options, dispatch))
        );
    }, [])

    useEffect(() => {
        if (state.length <= 0 || !chart) return;

        dispatch(updateChart({
            ...chart,
            type: getField('chartTypes').value,
            props: {
                ...chart.props,
                y: getField('attributes').value
            }
        } as Chart));
        /* eslint-disable */
        console.log('attr or type changed');
    }, [ getField('attributes').value, getField('chartTypes').value ]);

    useEffect(() => {
        if (state.length <= 0 || !chart) return;
        const newValue = getField('groupByTime').value;
        const newChart = { ...chart };

        newChart.api.params = {
            ...newChart.api.params,
            'group_by_time': newValue,
            'limit': newValue === 'true' ? '20' : '4'
        };

        fetchApi(newChart.api)
            .then(({ items }: Record<string, unknown>) => {
                newChart.props = {
                    ...newChart.props,
                    data: items as Record<string, unknown>[],
                    x: newValue === 'true' ? 'created_date' : ''
                }
                dispatch(updateChart(newChart));
                dispatch(setOptionValue(
                    'chartTypes',
                    newValue === 'true' ? 'line' : 'pie'
                ))
                /* eslint-disable */
                console.log('groupby changed');
            })
            .catch(() => ({}));

    }, [ getField('groupByTime').value ])

    return (
        <Card>
            <CardTitle>Options</CardTitle>
            <CardBody>
                { state.map((item, idx) => <Select key={idx} {...item} />) }
            </CardBody>
        </Card>
    );
};

export default Form;
