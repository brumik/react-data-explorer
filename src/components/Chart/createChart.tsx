import React from 'react';
import {
    VictoryBar,
    VictoryLine,
    VictoryPie,
    VictoryArea,
    VictoryScatter,
    VictoryHistogram
} from 'victory';
import {
    ChartType,
    Chart,
    ChartElement
} from './types';

const components: Partial<Record<ChartType, React.ReactType>> = {
    [ChartType.bar]: VictoryBar,
    [ChartType.line]: VictoryLine,
    [ChartType.pie]: VictoryPie,
    [ChartType.area]: VictoryArea,
    [ChartType.scatter]: VictoryScatter,
    [ChartType.histogram]: VictoryHistogram
};

const createChart = (
    id: number,
    charts: ChartElement[]
): React.ReactElement => {
    const chart = charts.find(({ id: i }) => i === id) as Chart;
    const SelectedChart = components[chart.type];

    return (
        <SelectedChart key={chart.id} {...chart.props} />
    );
};

export default createChart;
