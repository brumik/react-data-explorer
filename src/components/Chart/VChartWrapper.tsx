import React, { FunctionComponent } from 'react';
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
import { useTypedSelector } from '../helpers';

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
    height = 200,
    xAxis = {},
    yAxis = {},
    children,
    status = APIStatus.success
}) => {
    const child = useTypedSelector(store => store.charts.find(({ id: i }) => i === children[0]));

    const Component = components[child.kind];

    xAxis = {
        style: axisStyle,
        fixLabelOverlap: false,
        domain: [0, 31],
        ...xAxis
    };

    yAxis = {
        style: axisStyle,
        domain: [0, 60000],
        tickFormat: (i: number) => (i && i >= 1000 ? `${i / 1000}k` : i),
        ...yAxis
    };

    return status === APIStatus.success && (
        <VictoryChart
            theme={VictoryTheme.material}
            height={height}
        >
            <VictoryAxis {...xAxis} />
            <VictoryAxis
                dependentAxis
                {...yAxis}
            />
            <Component id={child.id} children={child.children}/>
        </VictoryChart>
    );
};

export default VChartWrapper;
