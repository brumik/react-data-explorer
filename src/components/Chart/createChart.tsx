import React from 'react';
import {
    VictoryBar,
    VictoryLine,
    VictoryPie
} from 'victory';
import {
    ChartType,
    Chart,
    ChartElement
} from './types';

const components: Partial<Record<ChartType, React.ReactType>> = {
    [ChartType.bar]: VictoryBar,
    [ChartType.line]: VictoryLine,
    [ChartType.pie]: VictoryPie
};

const createChart = (
    id: number,
    charts: ChartElement[],
    props = {}
): React.ReactElement => {
    const chart = charts.find(({ id: i }) => i === id) as Chart;
    const SelectedChart = components[chart.type];

    return (
        <SelectedChart key={chart.id} {...props} {...chart.props} />
    );
};

export default createChart;
