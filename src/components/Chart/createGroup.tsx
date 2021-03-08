import React from 'react';
import { ChartGroup } from '@patternfly/react-charts';
import {
    ChartGroup as ChartGroupType,
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
    const group = charts.find(({ id: i }) => i === id) as ChartGroupType;
    const children = charts.filter(({ parent }) => parent === id);

    if (group.api) {
        charts = passDataToChildren(
            charts,
            children.map(({ id: i }) => i),
            group.api.data
        );
    }

    return (
        <ChartGroup
            offset={20}
            {...group.props}
        >
            { children.map(child => components[child.kind](child.id, { ...data, charts })) }
        </ChartGroup>
    );
};

export default createGroup;
