import React, { FunctionComponent } from 'react';
import {
    VictoryChart,
    VictoryTheme,
    VictoryAxis
} from 'victory';
import {
    ChartWrapper,
    ChartKind
} from '../../types';
import { useTypedSelector } from '../helpers';
import createChart from './createChart'
import createGroup from './createGroup'

const axisStyle = {
    axisLabel: { fontSize: 7, padding: 22 },
    ticks: { size: 5 },
    tickLabels: { fontSize: 5, padding: 2 }
};

const components: Partial<Record<ChartKind, (id: number) => any>> = {
    [ChartKind.group]: createGroup,
    // [ChartKind.stack]: VChartStack,
    [ChartKind.simple]: createChart
};

const VChartWrapper: FunctionComponent<ChartWrapper> = ({
    height = 200,
    xAxis = {},
    yAxis = {},
    children
}) => {
    const child = useTypedSelector(store => store.charts.find(({ id: i }) => i === children[0]));

    const component = components[child.kind];

    xAxis = {
        style: axisStyle,
        fixLabelOverlap: true,
        // TODO: Apply this logic when?
        tickFormat: (i: string) => (i && i.split('-')[2]),
        ...xAxis
    };

    yAxis = {
        style: axisStyle,
        // TODO: Apply this logic when?
        tickFormat: (i: number) => (i && i >= 1000 ? `${i / 1000}k` : i),
        ...yAxis
    };

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            height={height}
            // Apply this logic only on bar charts
            domainPadding={{ x: [10, 10] }}
        >
            <VictoryAxis {...xAxis} />
            <VictoryAxis
                dependentAxis
                {...yAxis}
            />
            { component(child.id) }
        </VictoryChart>
    );
};

export default VChartWrapper;
