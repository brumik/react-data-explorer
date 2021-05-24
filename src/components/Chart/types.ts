import {
    ChartBarProps,
    ChartProps,
    ChartTooltipProps as PFChartTooltipProps,
    ChartStackProps,
    ChartGroupProps,
    ChartPieProps,
    ChartLegendOrientation,
    ChartPieLegendPosition as ChartLegendPosition,
    ChartLineProps,
    ChartAreaProps,
    ChartScatterProps,
    ChartThemeColor,
    ChartAxisProps as PFChartAxisProps
} from '@patternfly/react-charts';
import { ChartAxisFormatFunction, ChartFunctions, ChartOnClickFunction } from './Functions/types';

export enum ChartKind {
    simple = 'simple',
    group = 'group',
    stack = 'stack',
    wrapper = 'wrapper'
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
    method?: string
}

interface ChartBase {
    id: number
    kind: ChartKind,
    parent: number // Id of the parent wrapper Element
}

export type ChartTooltipCustomFunction = (datum: Record<string, any>) => string;
export interface ChartTooltipProps {
    type?: ChartTooltipType,
    props?: PFChartTooltipProps,
    labelName?: string,
    customFnc?: ChartTooltipCustomFunction
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

export interface ChartAxisProps extends Omit<PFChartAxisProps, 'tickFormat'> {
    tickFormat?: string
}

export { ChartLegendPosition, ChartLegendOrientation };
export type ChartLegendData = { name: string, childName?: string }[]

export interface ChartLegendProps {
    interactive?: boolean,
    position: ChartLegendPosition,
    orientation: ChartLegendOrientation
}

export enum ChartTopLevelType {
    chart = 'chart',
    pie = 'pie'
}

export interface ChartTopLevelElement extends ChartBase {
    kind: ChartKind.wrapper,
    parent: null,
    type: ChartTopLevelType,
    api?: ChartApiProps,
}

export interface ChartWrapper extends ChartTopLevelElement {
    type: ChartTopLevelType.chart,
    props: ChartProps,
    xAxis: ChartAxisProps,
    yAxis: ChartAxisProps,
    legend?: ChartLegendProps,
    tooltip?: {
        cursor?: boolean,
        customFnc?: ChartTooltipCustomFunction,
    }
}

export interface ChartPieLegendProps {
    interactive?: boolean,
    position: ChartLegendPosition,
    orientation: ChartLegendOrientation
}

export interface ChartPie extends ChartTopLevelElement {
    type: ChartTopLevelType.pie,
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

// Reexport theme color from PF
export { ChartThemeColor };

export type ChartSchemaElement = ChartSimple | ChartPie | ChartWrapper | ChartGroup | ChartStack;
export type ChartTopSchemaElement = ChartWrapper | ChartPie;
export interface ChartSchema {
    charts: ChartSchemaElement[],
    functions: ChartFunctions
}
