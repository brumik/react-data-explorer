import React, { FunctionComponent, useEffect } from 'react';
import { Card, CardTitle, CardBody } from '@patternfly/react-core';
import Select from './Select';
import { FormOption } from './types';
import { Chart, ChartType } from '../Chart/types';
import { useTypedSelector } from '../../store/';
import { apiOptionsToFormOptions } from './helpers'
import { useDispatch } from 'react-redux';
import { updateChart } from '../../store/charts/actions';
import { set as setForm } from '../../store/form/actions';

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
            value:  'Bar Chart'
        },
        {
            key: ChartType.line,
            value:  'Line Chart'
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

    const fieldValue = (n: string) =>
        state.find(({ name }) => name === n).value

    useEffect(() => {
        dispatch(
            setForm(apiOptionsToFormOptions(options, dispatch))
        );
    }, [])

    useEffect(() => {
        if (state.length <= 0 || !chart) return;

        dispatch(updateChart({
            ...chart,
            type: fieldValue('chartTypes'),
            props: {
                ...chart.props,
                y: fieldValue('attributes')
            }
        } as Chart));
    }, [ state ]);

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
