import React from 'react';
import {
    VictoryBar,
    VictoryLine
} from 'victory';
import { ChartType, Chart } from '../../types';
import { useTypedSelector } from '../helpers';

const createChart = (id: number): React.ReactElement => {
    const components: Partial<Record<ChartType, React.ReactType>> = {
        [ChartType.bar]: VictoryBar,
        [ChartType.line]: VictoryLine
    };

    const { children: _, ...c } = useTypedSelector(store =>
        store.charts.find(({ id: i }) => i === id)) as Chart;

    const SelectedChart = components[c.type];

    return (
        <SelectedChart key={id} {...c} />
    );
};

export default createChart;
