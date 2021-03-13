import React from 'react';
import { ChartGroup as PFChartGroup } from '@patternfly/react-charts';
import {
    ChartData,
    ChartDataKind,
    ChartGroup,
    ChartGroupedData,
    ChartKind,
    ChartSchema,
    ChartSchemaElement,
    ChartSimple,
    ChartSimpleData
} from './types';
import createChart from './createChart';

const components: Partial<Record<ChartKind, (
    id: number,
    data: ChartSchema,
    resolvedApi: ChartData
) => React.ReactElement>> = {
    [ChartKind.simple]: createChart
};

const createDynamicChildren = (
    charts: ChartSchemaElement[],
    template: ChartSimple,
    parent: number,
    data: ChartGroupedData
): ChartSchemaElement[] => ([
    ...charts,
    ...data.map((_d, idx) => ({
        ...template,
        id: idx,
        parent
    }))
]);

const createGroup = (
    id: number,
    data: ChartSchema,
    resolvedApi: ChartData
): React.ReactElement => {
    let { charts } =  data;
    const group = charts.find(({ id: i }) => i === id) as ChartGroup;
    let children = charts.filter(({ parent }) => parent === id);

    let renderedChildren: React.ReactElement[] = [];

    if (resolvedApi.kind === ChartDataKind.grouped) {
        charts = createDynamicChildren(
            charts,
            group.template,
            group.id,
            resolvedApi.data as ChartGroupedData
        );
        children = charts.filter(({ parent }) => parent === id);
        renderedChildren = children.map((child, idx) => {
            const calculatedApi = {
                data: resolvedApi.data[idx] as ChartSimpleData,
                kind: ChartDataKind.simple
            }
            return components[child.kind](child.id, { ...data, charts }, calculatedApi)
        });
    } else {
        renderedChildren = children.map(child => components[child.kind](child.id, data, resolvedApi));
    }

    return (
        <PFChartGroup
            {...group.props}
        >
            { renderedChildren }
        </PFChartGroup>
    );
};

export default createGroup;
