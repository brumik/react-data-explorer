import {
    ChartBarProps,
    ChartProps,
    ChartTooltipProps,
    ChartStackProps,
    ChartGroupProps,
    ChartLegendPosition as LegendPosition,
    ChartLegendOrientation as LegendOrientation
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

export enum ApiDataKind {
    simple = 'simple',
    grouped = 'grouped'
}

export type SimpleApiDataFormat = Record<string, unknown>[]
export type GroupedApiDataFormat = SimpleApiDataFormat[]
export type ApiDataFormat = SimpleApiDataFormat | GroupedApiDataFormat

export interface ResolvedApi {
    data: ApiDataFormat,
    kind: ApiDataKind
}

export interface ApiProps {
    params: Record<string, unknown>,
    url: string,
    optionUrl: string
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
    tooltip?: TooltipProps
    onClick?: string
}

/* Chart Group Wrapper Types */
export interface GroupProps extends ChartGroupProps {
    offset?: number
}

export interface ChartGroup extends ChartBase {
    kind: ChartKind.group,
    props: GroupProps
    template?: Chart
}

/* Chart Stack Wrapper Types */
export interface ChartStack extends ChartBase {
    kind: ChartKind.stack,
    props: ChartStackProps,
}

/* Chart Wrapper Types */
export interface AxisProps {
    label?: string,
    tickFormat?: string,
    fixLabelOverlap?: boolean,
    domain?: any,
    style?: any
}

export { LegendPosition, LegendOrientation };
export type LegendData = { name: string }[]

export interface LegendProps {
    data?: LegendData,
    position: LegendPosition,
    orientation: LegendOrientation
}

export interface WrapperTooltipProps {
    labelAttr: string,
    labelName?: string
}

export interface ChartWrapper extends ChartBase {
    kind: ChartKind.wrapper,
    parent: null,
    api?: ApiProps
    props: ChartProps,
    xAxis: AxisProps,
    yAxis: AxisProps,
    legend?: LegendProps,
    tooltip?: WrapperTooltipProps[],
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
