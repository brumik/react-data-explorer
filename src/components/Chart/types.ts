export enum ChartKind {
    simple = 'simple',
    group = 'group',
    stack = 'stack',
    wrapper = 'wrapper'
}

export interface ApiProps {
    params: Record<string, string>,
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

export interface ChartProps {
    data?: Record<string, unknown>[],
    height?: number,
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
interface GroupProps {
    offset?: number
}

export interface ChartGroup extends ChartBase {
    kind: ChartKind.group,
    props: GroupProps
}

/* Chart Stack Wrapper Types */
interface StackProps {
    colorScale?: string[]
}

export interface ChartStack extends ChartBase {
    kind: ChartKind.stack,
    props: StackProps
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
    xAxis: AxisProps,
    yAxis: AxisProps,
    hidden?: boolean
}

export type ChartElement = Chart | ChartWrapper | ChartGroup | ChartStack;
