import React from 'react';
import { ChartGroup } from '@patternfly/react-charts';
import {
    ChartElement,
    ChartGroup as ChartGroupType,
    ChartKind,
    Chart,
    DataKind,
    DataType,
    GroupedApiDataFormat,
    SimpleApiDataFormat
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

const createDynamicChildren = (
    charts: ChartElement[],
    template: Chart,
    parent: number,
    data: GroupedApiDataFormat
): ChartElement[] => ([
    ...charts,
    ...data.map((d, idx) => ({
        ...template,
        id: idx,
        parent,
        props: {
            ...template.props,
            data: d
        }
    }))
]);

const createGroup = (
    id: number,
    data: DataType
): React.ReactElement => {
    let { charts } =  data;
    const group = charts.find(({ id: i }) => i === id) as ChartGroupType;
    let children = charts.filter(({ parent }) => parent === id);

    if (group.api) {
        switch(group.api.dataKind) {
            case DataKind.simple:
                charts = passDataToChildren(
                    charts,
                    children.map(({ id: i }) => i),
                    group.api.data as SimpleApiDataFormat
                );
                break;
            case DataKind.grouped:
                charts = createDynamicChildren(
                    charts,
                    group.template,
                    group.id,
                    group.api.data as GroupedApiDataFormat
                );
                children = charts.filter(({ parent }) => parent === id);
                break;
        }
    }

    return (
        <ChartGroup
            {...group.props}
        >
            { children.map(child => components[child.kind](child.id, { ...data, charts })) }
        </ChartGroup>
    );
};

export default createGroup;
