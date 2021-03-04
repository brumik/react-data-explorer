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
    DataType
} from './types';
import createChart from './createChart';
import createGroup from './createGroup';
import createStack from './createStack';
import { axisStyle, disabledAxisProps } from './styling';

const components: Partial<Record<ChartKind, (
    id: number,
    data: DataType
) => React.ReactElement>> = {
    [ChartKind.group]: createGroup,
    [ChartKind.stack]: createStack,
    [ChartKind.simple]: createChart
};

const createWrapper = (
    id: number,
    data: DataType
): React.ReactElement => {
    const { charts, functions } = data;
    const wrapper = charts.find(({ id: i }) => i === id) as ChartWrapper;
    const child = charts.find(({ parent }) => parent === wrapper.id);

    const xAxis = {
        style: axisStyle,
        fixLabelOverlap: true,
        ...wrapper.xAxis,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...wrapper.xAxis.tickFormat && { tickFormat: functions.axisFormat[wrapper.xAxis.tickFormat] }
    };

    const yAxis = {
        style: axisStyle,
        ...wrapper.yAxis,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tickFormat: functions.axisFormat[wrapper.yAxis.tickFormat]
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
                <VictoryAxis {...disabledAxisProps} />
            }
            { !wrapper.hidden && <VictoryAxis {...xAxis} /> }
            { !wrapper.hidden && <VictoryAxis dependentAxis {...yAxis} />}
            { wrapper.legend && <VictoryLegend {...wrapper.legend} />}
            { child && components[child.kind](child.id, data) }
        </VictoryChart>
    );
};

export default createWrapper;
