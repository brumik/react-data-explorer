import {
    ChartBarProps,
    ChartProps,
    ChartTooltipProps as PFChartTooltipProps,
    ChartStackProps,
    ChartGroupProps,
    ChartLegendPosition as ChartLegendPosition,
    ChartLegendOrientation as ChartLegendOrientation,
    ChartPieProps,
    ChartPieLegendPosition as ChartPieLegendPosition,
    ChartLineProps,
    ChartAreaProps,
    ChartScatterProps
} from '@patternfly/react-charts';
import { ChartAxisFormatFunction, ChartFunctions, ChartOnClickFunction } from './Functions/types';

export enum ChartKind {
    simple = 'simple',
    group = 'group',
    stack = 'stack',
    wrapper = 'wrapper',
    pie = 'pie'
}

export enum ChartType {
    bar = 'bar',
    line = 'line',
    area = 'area',
    scatter = 'scatter'
}

export enum ChartTooltipType {
    default = 'default'
}

export interface ChartDataSerie {
    serie: Record<string, string | number>[],
    hidden: boolean,
    name: string
}
export type ChartData = ChartDataSerie[]

export interface ChartApiData {
    data: ChartData,
    legend?: ChartLegendData
}

export interface ChartApiProps {
    params: Record<string, unknown>,
    url: string,
    optionUrl: string
}

interface ChartBase {
    id: number
    kind: ChartKind,
    parent: number // Id of the parent wrapper Element
}

export interface ChartTooltipProps {
    type: ChartTooltipType,
    props: PFChartTooltipProps,
    labelAttr: string
    labelName?: string,
}

export type ChartSimpleProps = ChartBarProps | ChartLineProps | ChartAreaProps | ChartScatterProps;

export interface ChartSimple extends ChartBase {
    kind: ChartKind.simple,
    props: ChartSimpleProps
    type: ChartType,
    tooltip?: ChartTooltipProps
    onClick?: string
}

export interface ChartGroup extends ChartBase {
    kind: ChartKind.group,
    props: ChartGroupProps
    template?: ChartSimple
}

export interface ChartStack extends ChartBase {
    kind: ChartKind.stack,
    props: ChartStackProps,
}

export interface ChartAxisProps {
    label?: string,
    tickFormat?: string,
    fixLabelOverlap?: boolean,
    domain?: any,
    style?: any
}

export { ChartLegendPosition, ChartLegendOrientation };
export type ChartLegendData = { name: string }[]

export interface ChartLegendProps {
    data?: ChartLegendData,
    position: ChartLegendPosition,
    orientation: ChartLegendOrientation
}

export interface ChartWrapperTooltipProps {
    labelAttr: string,
    labelName?: string
}

export interface ChartWrapper extends ChartBase {
    kind: ChartKind.wrapper,
    parent: null,
    api?: ChartApiProps
    props: ChartProps,
    xAxis: ChartAxisProps,
    yAxis: ChartAxisProps,
    legend?: ChartLegendProps,
    tooltip?: ChartWrapperTooltipProps[]
}

export { ChartPieLegendPosition };
export interface ChartPieLegendProps {
    data?: ChartLegendData,
    position: ChartPieLegendPosition,
    orientation: ChartLegendOrientation
}

export interface ChartPie extends ChartBase {
    kind: ChartKind.pie,
    parent: null,
    api?: ChartApiProps,
    props: ChartPieProps,
    legend?: ChartPieLegendProps,
    tooltip?: PFChartTooltipProps
}

// Reexport chart functions
export {
    ChartOnClickFunction,
    ChartAxisFormatFunction,
    ChartFunctions
}

export type ChartSchemaElement = ChartSimple | ChartPie | ChartWrapper | ChartGroup | ChartStack;
export interface ChartSchema {
    charts: ChartSchemaElement[],
    functions: ChartFunctions
}
