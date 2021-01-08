import React from 'react';
import {
    VictoryBar,
    VictoryLine,
    VictoryPie
} from 'victory';
import { ChartType, Chart } from './types';
import { useTypedSelector } from '../../store/';

const createChart = (id: number): React.ReactElement => {
    const components: Partial<Record<ChartType, React.ReactType>> = {
        [ChartType.bar]: VictoryBar,
        [ChartType.line]: VictoryLine,
        [ChartType.pie]: VictoryPie
    };

    const c = useTypedSelector(store =>
        store.charts.find(({ id: chartId }) => chartId === id)) as Chart;

    const SelectedChart = components[c.type];

    return (
        <SelectedChart key={id} {...c.props} />
    );
};

export default createChart;
