import React from 'react';
import {
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
    VictoryLegend
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
    charts: ChartElement[]
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

    const childIsBarChart = () =>
        child.kind === ChartKind.simple && child.type === 'bar';

    const props = {
        theme: VictoryTheme.material,
        domainPadding: childIsBarChart() ? 20 : 0,
        ...wrapper.props
    }

    return (
        <VictoryChart
            key={id}
            {...props}
        >
            { wrapper.hidden &&
                <VictoryAxis style={{
                    axis: {stroke: 'transparent'},
                    ticks: {stroke: 'transparent'},
                    tickLabels: { fill:'transparent'}
                }} />
            }
            { !wrapper.hidden && <VictoryAxis {...xAxis} /> }
            { !wrapper.hidden && <VictoryAxis dependentAxis {...yAxis} />}
            { wrapper.legend && <VictoryLegend {...wrapper.legend} />}
            { child && components[child.kind](child.id, charts) }
        </VictoryChart>
    );
};

export default createWrapper;
