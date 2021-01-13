import React, { FunctionComponent } from 'react';
import { TextInput, Button } from '@patternfly/react-core';
import { useDispatch } from 'react-redux';
import {
    ChartKind,
    ChartWrapper,
    ChartType,
    Chart
} from '../Chart/types';
import { useTypedSelector } from '../../store/';
import {
    updateWrapper,
    addChartElement
} from '../../store/charts/actions';
import ChartEditor from './ChartEditor';

interface Props {
    wrapperId: number
}

const WrapperEditor: FunctionComponent<Props> = ({ wrapperId }) => {
    const dispatch = useDispatch();

    const wrapper = useTypedSelector(store => store.charts.find(
        ({ id, kind }) => id === wrapperId && kind === ChartKind.wrapper
    ) as ChartWrapper);

    const children = useTypedSelector(store => store.charts.filter(
        ({ parent, kind }) => parent === wrapper.id && kind === ChartKind.simple
    ) as Chart[]);

    const addNewChart = () => {
        dispatch(addChartElement({
            id: null,
            kind: ChartKind.simple,
            parent: wrapper.id,
            type: ChartType.bar,
            props: {
                data: [],
                x: 'created_date',
                y: 'host_count'
            },
            api: {
                params: {},
                url: 'https://prod.foo.redhat.com:1337/api/tower-analytics/v1/job_explorer/',
                optionUrl: '/demo/api/jobExplorerOptions.json'
            }
        }))
    }

    const chartOptions = () => {
        if (children.length > 0) {
            return children.map(({ id }) =>
                <ChartEditor key={id} chartId={id} />
            );
        } else {
            return (
                <Button
                    onClick={() => {
                        addNewChart()
                    }}
                >
                    New Chart
                </Button>
            );
        }
    };

    const options = () => {
        if (!wrapper.hidden) {
            return (
                <React.Fragment>
                    <h3>Wrapper Oprions</h3>
                    <span>Label X:</span>
                    <TextInput
                        style={{ width: '20%' }}
                        value={wrapper.xAxis.label}
                        type="text"
                        onChange={(value) => {
                            dispatch(updateWrapper({
                                ...wrapper,
                                xAxis: {
                                    ...wrapper.xAxis,
                                    label: value
                                }
                            }))
                        }}
                        aria-label="Chart x label"
                    />
                    <span>Label Y:</span>
                    <TextInput
                        style={{ width: '20%' }}
                        value={wrapper.yAxis.label}
                        type="text"
                        onChange={(value) => {
                            dispatch(updateWrapper({
                                ...wrapper,
                                yAxis: {
                                    ...wrapper.yAxis,
                                    label: value
                                }
                            }))
                        }}
                        aria-label="Chart x label"
                    />
                    <span>Height:</span>
                    <TextInput
                        style={{ width: '20%' }}
                        value={wrapper.props.height}
                        type="number"
                        min={150}
                        max={500}
                        onChange={(value) => {
                            dispatch(updateWrapper({
                                ...wrapper,
                                props: {
                                    ...wrapper.props,
                                    height: parseInt(value, 10) || 150
                                }
                            }))
                        }}
                        aria-label="Chart x label"
                    />
                </React.Fragment>
            );
        } else {
            return (<></>);
        }
    }

    return (
        <React.Fragment>
            { options() }
            { chartOptions() }
        </React.Fragment>
    );
};

export default WrapperEditor;
