/**
 * This component will recieve a JSON file and render a chart from it.
 */
import React, { FunctionComponent } from 'react';
import { VictoryBar, VictoryChart } from 'victory';
import { ChartOptions, ChartType } from '../types';

const components = {
    bar: VictoryBar
};

interface PropTypes extends ChartOptions {
    data: Record<string, unknown>[]
}

const ChartRenderer: FunctionComponent<PropTypes> = ({
    data,
    chartType = ChartType.bar,
    x = 'x',
    y = 'y'
}) => {
    const Chart = components[chartType];
    return (
        <VictoryChart>
            <Chart
                data={ data }
                x={ x }
                y={ y }
            />
        </VictoryChart>
    );
};

export default ChartRenderer;
