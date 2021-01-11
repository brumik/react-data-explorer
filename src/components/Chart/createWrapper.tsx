import React from 'react';
import {
    VictoryChart,
    VictoryTheme,
    VictoryAxis
} from 'victory';
import {
    ChartWrapper,
    ChartKind,
    ChartElement
} from './types';
import createChart from './createChart'
import createGroup from './createGroup'

const axisStyle = {
    axisLabel: { fontSize: 7, padding: 22 },
    ticks: { size: 5 },
    tickLabels: { fontSize: 5, padding: 2 }
};

const components: Partial<Record<ChartKind, (id: number, allCharts: ChartElement[]) => React.ReactElement>> = {
    [ChartKind.group]: createGroup,
    // [ChartKind.stack]: VChartStack,
    [ChartKind.simple]: createChart
};

const createWrapper = (id: number, allCharts: ChartElement[]): React.ReactElement => {
    const wrapper = allCharts.find(({ id: i }) => i === id) as ChartWrapper;
    const child = allCharts.find(({ id: i }) => i === wrapper.children[0]);

    const xAxis = {
        style: axisStyle,
        fixLabelOverlap: true,
        // TODO: Apply this logic when?
        // tickFormat: (i: string) => (i && i.split('-')[2]),
        ...wrapper.xAxis
    };

    const yAxis = {
        style: axisStyle,
        // TODO: Apply this logic when?
        // tickFormat: (i: number) => (i && i >= 1000 ? `${i / 1000}k` : i),
        ...wrapper.yAxis
    };

    return (
        <VictoryChart
            key={id}
            theme={VictoryTheme.material}
            height={wrapper.props.height}
            // Apply this logic only on bar charts
            // domainPadding={{ x: [10, 10] }}
        >
            <VictoryAxis {...xAxis} />
            <VictoryAxis
                dependentAxis
                {...yAxis}
            />
            { components[child.kind](child.id, allCharts) }
        </VictoryChart>
    );
};

export default createWrapper;
