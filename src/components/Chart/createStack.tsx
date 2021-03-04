import React from 'react';
import { VictoryStack } from 'victory';
import {
    ChartStack,
    ChartKind,
    Chart,
    DataType
} from './types';
import createChart from './createChart';
import { passDataToChildren } from './helpers';

const components: Partial<Record<ChartKind, (
    id: number,
    data: DataType
) => React.ReactElement>> = {
    [ChartKind.simple]: createChart
};

const createStack = (
    id: number,
    data: DataType
): React.ReactElement => {
    let { charts } = data;
    const stack = charts.find(({ id: i }) => i === id) as ChartStack;
    const children = charts.filter(({ parent }) => parent === id) as Chart[];

    if (stack.api) {
        charts = passDataToChildren(
            charts,
            children.map(({ id: i }) => i),
            stack.api.data
        );
    }

    return (
        <VictoryStack
            key={stack.id}
            {...stack.props}
        >
            { children.map(child => components[child.kind](child.id, { ...data, charts })) }
        </VictoryStack>
    )
};

export default createStack;
