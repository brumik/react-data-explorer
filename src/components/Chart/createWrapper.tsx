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
import createChart from './createChart';
import createGroup from './createGroup';
import createStack from './createStack';

const axisStyle = {
    axisLabel: { fontSize: 7, padding: 22 },
    ticks: { size: 5 },
    tickLabels: { fontSize: 5, padding: 2 }
};

const components: Partial<Record<ChartKind, (
    id: number,
    charts: ChartElement[],
    props: any
) => React.ReactElement>> = {
    [ChartKind.group]: createGroup,
    [ChartKind.stack]: createStack,
    [ChartKind.simple]: createChart
};

const createWrapper = (id: number, charts: ChartElement[]): React.ReactElement => {
    const wrapper = charts.find(({ id: i }) => i === id) as ChartWrapper;
    const child = charts.find(({ parent }) => parent === wrapper.id);

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

    const render = () => {
        if (!wrapper.hidden) {
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
                    { child && components[child.kind](child.id, charts, {}) }
                </VictoryChart>
            );
        } else {
            return child && components[child.kind](child.id, charts, wrapper.props);
        }
    }

    return render();
};

export default createWrapper;
