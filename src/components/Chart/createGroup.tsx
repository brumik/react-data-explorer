import React from 'react';
import { VictoryGroup } from 'victory';
import {
    ChartGroup,
    ChartKind,
    ChartElement
} from './types';
import createChart from './createChart';
import createStack from './createStack';

const components: Partial<Record<ChartKind, (
    id: number,
    charts: ChartElement[]
) => React.ReactElement>> = {
    [ChartKind.stack]: createStack,
    [ChartKind.simple]: createChart
};

const createGroup = (
    id: number,
    charts: ChartElement[]
): React.ReactElement => {
    const group = charts.find(({ id: i }) => i === id) as ChartGroup;
    const children = charts.filter(({ parent }) => parent === id);

    return (
        <VictoryGroup
            offset={20}
            {...group.props}
        >
            { children.map(child => components[child.kind](child.id, charts)) }
        </VictoryGroup>
    );
};

export default createGroup;
