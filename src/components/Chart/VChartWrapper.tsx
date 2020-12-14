import React, { FunctionComponent, useContext } from 'react';
import ChartElementsContext from '../ChartElementsContext'
import {
    VictoryChart,
    VictoryTheme,
    VictoryAxis
} from 'victory';
import {
    ChartWrapper,
    ChartKind,
    APIStatus
} from '../../types';
import VChart from './VChart';
import VChartGroup from './VChartGroup';
import VChartStack from './VChartStack';

const components: Partial<Record<ChartKind, React.ReactType>> = {
    [ChartKind.group]: VChartGroup,
    [ChartKind.stack]: VChartStack,
    [ChartKind.simple]: VChart
};

const axisStyle = {
    axisLabel: { fontSize: 7, padding: 22 },
    ticks: { size: 5 },
    tickLabels: { fontSize: 5, padding: 2 }
};

const VChartWrapper: FunctionComponent<ChartWrapper> = ({
    id,
    height = 200,
    xAxis = {},
    yAxis = {},
    status = APIStatus.success
}) => {
    const chartElements = useContext(ChartElementsContext);
    const chart = chartElements.find(({ parent }) => parent === id);

    const Component = components[chart.kind];

    xAxis = {
        style: axisStyle,
        // tickFormat: (i: string) => (i ? parseInt(i.split('-')[2], 10) : i),
        fixLabelOverlap: false,
        ...xAxis
    };

    yAxis = {
        style: axisStyle,
        tickFormat: (i: number) => (i && i >= 1000 ? `${i / 1000}k` : i),
        ...yAxis
    };

    return status === APIStatus.success && (
        <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            height={height}
            {...chart}
        >
            <VictoryAxis {...xAxis} />
            <VictoryAxis
                dependentAxis
                {...yAxis}
            />
            <Component {...chart}/>
        </VictoryChart>
    );
};

export default VChartWrapper;
