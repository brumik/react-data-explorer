export enum ChartKind {
    simple = 'simple',
    group = 'group',
    stack = 'stack',
    wrapper = 'wrapper'
}

export enum APIStatus {
    loading = 0,
    success = 1,
    error = -1
}

export interface ApiProps {
    params: Record<string, string>,
    url: string,
    optionUrl: string
}

export interface ChartBase {
    id: number
    kind: ChartKind,
    parent: number, // Id of the parent wrapper Element
    children: number[], // ids of the children
}

/* Chart Types */
export enum ChartType {
    bar = 'bar',
    line = 'line'
}

export interface ChartProps {
    data?: Record<string, unknown>[],
    x?: string,
    y?: string
}

export interface Chart extends ChartBase {
    kind: ChartKind.simple,
    props: ChartProps,
    type: ChartType,
    api: ApiProps
}

/* Chart Group Wrapper Types */
export interface ChartGroupWrapper extends ChartBase {
    kind: ChartKind.group,
}

/* Chart Stack Wrapper Types */
export interface ChartStackWrapper extends ChartBase {
    kind: ChartKind.stack,
}

/* Chart Wrapper Types */
interface AxisProps {
    label?: string,
    tickFormat?: any,
    fixLabelOverlap?: boolean,
    domain?: any,
    style?: any
}

interface WrapperProps {
    height?: number
}

export interface ChartWrapper extends ChartBase {
    kind: ChartKind.wrapper,
    parent: null,
    props: WrapperProps,
    xAxis?: AxisProps,
    yAxis?: AxisProps,
    status?: APIStatus
}

export type ChartElement = Chart | ChartWrapper;
