import React from 'react';

import { ChartStack } from '@patternfly/react-charts';
import {
    ChartStack as ChartStackType,
    ChartKind,
    Chart,
    DataType,
    ResolvedApi
} from './types';
import createChart from './createChart';

const components: Partial<Record<ChartKind, (
    id: number,
    data: DataType,
    resolvedApi: ResolvedApi
) => React.ReactElement>> = {
    [ChartKind.simple]: createChart
};

const createStack = (
    id: number,
    data: DataType,
    resolvedApi: ResolvedApi
): React.ReactElement => {
    const { charts } = data;
    const stack = charts.find(({ id: i }) => i === id) as ChartStackType;
    const children = charts.filter(({ parent }) => parent === id) as Chart[];

    return (
        <ChartStack
            key={stack.id}
            {...stack.props}
        >
            { children.map(child => components[child.kind](child.id, data, resolvedApi)) }
        </ChartStack>
    )
};

export default createStack;
