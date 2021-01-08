import React from 'react';
import {
    VictoryChart,
    VictoryTheme,
    VictoryAxis
} from 'victory';
import {
    ChartWrapper,
    ChartKind
} from './types';
import { useTypedSelector } from '../../store/';
import createChart from './createChart'
import createGroup from './createGroup'

const axisStyle = {
    axisLabel: { fontSize: 7, padding: 22 },
    ticks: { size: 5 },
    tickLabels: { fontSize: 5, padding: 2 }
};

const components: Partial<Record<ChartKind, (id: number) => React.ReactElement>> = {
    [ChartKind.group]: createGroup,
    // [ChartKind.stack]: VChartStack,
    [ChartKind.simple]: createChart
};

const createWrapper = (id: number): React.ReactElement => {
    const wrapper = useTypedSelector(store => store.charts.find(({ id: i }) => i === id) as ChartWrapper);
    const child = useTypedSelector(store => store.charts.find(({ id: i }) => i === wrapper.children[0]));

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
            domainPadding={{ x: [10, 10] }}
        >
            <VictoryAxis {...xAxis} />
            <VictoryAxis
                dependentAxis
                {...yAxis}
            />
            { components[child.kind](child.id) }
        </VictoryChart>
    );
};

export default createWrapper;
