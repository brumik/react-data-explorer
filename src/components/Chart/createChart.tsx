import React from 'react';
import {
    VictoryBar,
    VictoryLine,
    VictoryPie
} from 'victory';
import {
    ChartType,
    Chart
} from './types';

const createChart = (chart: Chart): React.ReactElement => {
    const components: Partial<Record<ChartType, React.ReactType>> = {
        [ChartType.bar]: VictoryBar,
        [ChartType.line]: VictoryLine,
        [ChartType.pie]: VictoryPie
    };

    const SelectedChart = components[chart.type];

    return (
        <SelectedChart key={chart.id} {...chart.props} />
    );
};

export default createChart;
