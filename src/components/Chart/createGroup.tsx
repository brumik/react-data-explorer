import React from 'react';
import { VictoryGroup } from 'victory';
import {
    ChartGroup,
    ChartKind,
    DataType
} from './types';
import createChart from './createChart';
import createStack from './createStack';
import { passDataToChildren } from './helpers';

const components: Partial<Record<ChartKind, (
    id: number,
    data: DataType
) => React.ReactElement>> = {
    [ChartKind.stack]: createStack,
    [ChartKind.simple]: createChart
};

const createGroup = (
    id: number,
    data: DataType
): React.ReactElement => {
    let { charts } =  data;
    const group = charts.find(({ id: i }) => i === id) as ChartGroup;
    const children = charts.filter(({ parent }) => parent === id);

    if (group.api) {
        charts = passDataToChildren(
            charts,
            children.map(({ id: i }) => i),
            group.api.data
        );
    }

    return (
        <VictoryGroup
            offset={20}
            {...group.props}
        >
            { children.map(child => components[child.kind](child.id, { ...data, charts })) }
        </VictoryGroup>
    );
};

export default createGroup;
