/**
 * This component will recieve a JSON file and render a chart from it.
 */
import React, { FunctionComponent } from 'react';
import {
    VictoryBar,
    VictoryChart,
    VictoryAxis,
    VictoryTheme
} from 'victory';
import { ChartOptions, ChartType } from '../../types';

const components = {
    bar: VictoryBar
};

interface AxisProps {
    label: string,
    tickFormat?: (value: string | number) => string | number,
    fixLabelOverlap?: boolean,
    style?: any
}

interface PropTypes extends ChartOptions {
    data: Record<string, unknown>[]
    xAxis: AxisProps,
    yAxis: AxisProps
}

const axisStyle = {
    axisLabel: { fontSize: 7, padding: 22 },
    ticks: { size: 5 },
    tickLabels: { fontSize: 5, padding: 2 }
};

const ChartRenderer: FunctionComponent<PropTypes> = ({
    data,
    chartType = ChartType.bar,
    x, y,
    xAxis,
    yAxis
}) => {
    const Chart = components[chartType];
    xAxis = {
        style: axisStyle,
        tickFormat: (i: string) => parseInt(i.split('-')[2], 10),
        fixLabelOverlap: true,
        ...xAxis
    };

    yAxis = {
        style: axisStyle,
        tickFormat: (i: number) => i >= 1000 ? `${i / 1000}k` : `${i}`,
        ...yAxis
    };

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={20}
            height={200}
        >
            <VictoryAxis {...xAxis} />
            <VictoryAxis
                dependentAxis
                {...yAxis}
            />
            <Chart
                data={data}
                x={x}
                y={y}
            />
        </VictoryChart>
    );
};

export default ChartRenderer;
