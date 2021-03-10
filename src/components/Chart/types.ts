import {
    ChartBarProps,
    ChartProps,
    ChartTooltipProps,
    ChartStackProps,
    ChartGroupProps
} from '@patternfly/react-charts';

export enum ChartKind {
    simple = 'simple',
    group = 'group',
    stack = 'stack',
    wrapper = 'wrapper'
}

export enum TooltipType {
    default = 'default'
}

export enum DataKind {
    simple = 'simple',
    grouped = 'grouped'
}

export type SimpleApiDataFormat = Record<string, unknown>[]
export type GroupedApiDataFormat = SimpleApiDataFormat[]

export interface ApiProps {
    params: Record<string, unknown>,
    url: string,
    optionUrl: string,
    data?: SimpleApiDataFormat | GroupedApiDataFormat,
    dataKind?: DataKind
}

export interface ChartBase {
    id: number
    kind: ChartKind,
    parent: number // Id of the parent wrapper Element
}

/* Chart Types */
export enum ChartType {
    bar = 'bar',
    line = 'line',
    pie = 'pie',
    area = 'area',
    scatter = 'scatter',
    histogram = 'histogram'
}

export interface TooltipProps {
    type: TooltipType,
    props: ChartTooltipProps,
    labelAttr: string
    labelName?: string,
}

export interface Chart extends ChartBase {
    kind: ChartKind.simple,
    props: ChartBarProps,
    type: ChartType,
    api?: ApiProps,
    legend?: TooltipProps
    onClick?: string
}

/* Chart Group Wrapper Types */
export interface GroupProps extends ChartGroupProps {
    offset?: number
}

export interface ChartGroup extends ChartBase {
    kind: ChartKind.group,
    props: GroupProps
    api?: ApiProps,
    template?: Chart
}

/* Chart Stack Wrapper Types */
export interface ChartStack extends ChartBase {
    kind: ChartKind.stack,
    props: ChartStackProps,
    api?: ApiProps
}

/* Chart Wrapper Types */
export interface AxisProps {
    label?: string,
    tickFormat?: string,
    fixLabelOverlap?: boolean,
    domain?: any,
    style?: any
}

export interface LegendProps {
    data: { name: string }[],
    position: string,
    orientation: string
}

export interface WrapperTooltipProps {
    labelAttr: string,
    labelName?: string
}

export interface ChartWrapper extends ChartBase {
    kind: ChartKind.wrapper,
    parent: null,
    api?: ApiProps // Currently this SHOULD NOT BE USED. Is here because of stupid Tscript
    props: ChartProps,
    xAxis: AxisProps,
    yAxis: AxisProps,
    legend?: LegendProps,
    label?: WrapperTooltipProps[],
    hidden?: boolean
}

// Overal types
export interface PropFunctions {
    onClick?: Record<string, any>
    axisFormat?: Record<string, any>
}

export interface DataType {
    charts: ChartElement[],
    functions: PropFunctions
}

export type ChartElement = Chart | ChartWrapper | ChartGroup | ChartStack;
