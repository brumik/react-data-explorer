import React from 'react';
import { ChartGroup } from '@patternfly/react-charts';
import {
    ChartElement,
    ChartGroup as ChartGroupType,
    ChartKind,
    Chart,
    DataType,
    GroupedApiDataFormat,
    ResolvedApi,
    ApiDataKind,
    ApiDataFormat
} from './types';
import createChart from './createChart';

const components: Partial<Record<ChartKind, (
    id: number,
    data: DataType,
    resolvedApi: ResolvedApi
) => React.ReactElement>> = {
    [ChartKind.simple]: createChart
};

const createDynamicChildren = (
    charts: ChartElement[],
    template: Chart,
    parent: number,
    data: GroupedApiDataFormat
): ChartElement[] => ([
    ...charts,
    ...data.map((_d, idx) => ({
        ...template,
        id: idx,
        parent
    }))
]);

const createGroup = (
    id: number,
    data: DataType,
    resolvedApi: ResolvedApi
): React.ReactElement => {
    let { charts } =  data;
    const group = charts.find(({ id: i }) => i === id) as ChartGroupType;
    let children = charts.filter(({ parent }) => parent === id);

    let renderedChildren: React.ReactElement[] = [];

    if (resolvedApi.kind === ApiDataKind.grouped) {
        charts = createDynamicChildren(
            charts,
            group.template,
            group.id,
            resolvedApi.data as GroupedApiDataFormat
        );
        children = charts.filter(({ parent }) => parent === id);
        renderedChildren = children.map((child, idx) => {
            const calculatedApi = {
                data: resolvedApi.data[idx] as ApiDataFormat,
                kind: ApiDataKind.simple
            }
            return components[child.kind](child.id, { ...data, charts }, calculatedApi)
        });
    } else {
        renderedChildren = children.map(child => components[child.kind](child.id, data, resolvedApi));
    }

    return (
        <ChartGroup
            {...group.props}
        >
            { renderedChildren }
        </ChartGroup>
    );
};

export default createGroup;
