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

const createChart = (id: number, allCharts: ChartElement[]): React.ReactElement => {
    const components: Partial<Record<ChartType, React.ReactType>> = {
        [ChartType.bar]: VictoryBar,
        [ChartType.line]: VictoryLine,
        [ChartType.pie]: VictoryPie
    };

    const c = allCharts.find(({ id: chartId }) => chartId === id) as Chart;

    const SelectedChart = components[c.type];

    return (
        <SelectedChart key={id} {...c.props} />
    );
};

export default createChart;
