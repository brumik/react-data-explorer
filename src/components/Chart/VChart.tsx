import React, { FunctionComponent } from 'react';
import {
    VictoryBar,
    VictoryLine
} from 'victory';
import { Chart, ChartType } from '../../types';

const components: Partial<Record<ChartType, React.ReactType>> = {
    [ChartType.bar]: VictoryBar,
    [ChartType.line]: VictoryLine
};

interface Props extends Chart {
    [x:string]: any
}

const VChart: FunctionComponent<Props> = ({
    data,
    type,
    x = 'x',
    y = 'y',
    ...rest
}) => {
    const MyChart = components[type];

    return (
        <MyChart
            data={data}
            x={x}
            y={y}
            {...rest}
        />
    );
};

export default VChart;
