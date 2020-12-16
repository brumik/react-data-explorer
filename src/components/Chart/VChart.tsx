import React, { FunctionComponent } from 'react';
import {
    VictoryBar,
    VictoryLine
} from 'victory';
import { ChartType, Chart } from '../../types';
import { useTypedSelector } from '../helpers';

const components: Partial<Record<ChartType, React.ReactType>> = {
    [ChartType.bar]: VictoryBar,
    [ChartType.line]: VictoryLine
};

interface Props {
    id: number,
    [x: string]: any
}

const VChart: FunctionComponent<Props> = ({
    id,
    ...rest
}) => {
    const chart = useTypedSelector(store => store.charts.find(({ id: i }) => i === id)) as Chart;

    const MyChart = components[chart.type];

    return (
        <MyChart {...rest} {...chart} />
    );
};

export default VChart;
