import React from 'react';
import { VictoryStack } from 'victory';
import {
    ChartStack,
    ChartKind,
    ChartElement,
    Chart
} from './types';
import createChart from './createChart';

const components: Partial<Record<ChartKind, (
    id: number,
    charts: ChartElement[],
    props: any
) => React.ReactElement>> = {
    [ChartKind.simple]: createChart
};

const createStack = (
    id: number,
    charts: ChartElement[],
    props = {}
): React.ReactElement => {
    const stack = charts.find(({ id: i }) => i === id) as ChartStack;
    const children = charts.filter(({ parent }) => parent === id) as Chart[];

    return (
        <VictoryStack
            key={stack.id}
            {...props}
            {...stack.props}
        >
            { children.map(child => components[child.kind](child.id, charts, props)) }
        </VictoryStack>
    );
};

export default createStack;
