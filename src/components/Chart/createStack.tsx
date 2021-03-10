import React from 'react';

import { ChartStack } from '@patternfly/react-charts';
import {
    ChartStack as ChartStackType,
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
    const stack = charts.find(({ id: i }) => i === id) as ChartStackType;
    const children = charts.filter(({ parent }) => parent === id) as Chart[];

    if (stack.api) {
        charts = passDataToChildren(
            charts,
            children.map(({ id: i }) => i),
            stack.api.data as Record<string, unknown>[]
        );
    }

    return (
        <ChartStack
            key={stack.id}
            {...stack.props}
        >
            { children.map(child => components[child.kind](child.id, { ...data, charts })) }
        </ChartStack>
    )
};

export default createStack;
