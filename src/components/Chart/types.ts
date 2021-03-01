import {
    VictoryLegendProps,
    VictoryBarProps,
    VictoryChartProps,
    VictoryTooltipProps,
    VictoryStackProps
} from 'victory';

export enum ChartKind {
    simple = 'simple',
    group = 'group',
    stack = 'stack',
    wrapper = 'wrapper'
}

export enum TooltipType {
    default = 'default'
}

export interface ApiProps {
    params: Record<string, any>,
    url: string,
    optionUrl: string,
    data?: Record<string, unknown>[]
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

export interface LegendProps {
    type: TooltipType,
    props: VictoryTooltipProps,
    labelAttr: string
    labelName?: string
}

export interface Chart extends ChartBase {
    kind: ChartKind.simple,
    props: VictoryBarProps,
    type: ChartType,
    api?: ApiProps,
    legend?: LegendProps
}

/* Chart Group Wrapper Types */
interface GroupProps {
    offset?: number
}

export interface ChartGroup extends ChartBase {
    kind: ChartKind.group,
    props: GroupProps
    api?: ApiProps
}

/* Chart Stack Wrapper Types */
export interface ChartStack extends ChartBase {
    kind: ChartKind.stack,
    props: VictoryStackProps,
    api?: ApiProps
}

/* Chart Wrapper Types */
interface AxisProps {
    label?: string,
    tickFormat?: any,
    fixLabelOverlap?: boolean,
    domain?: any,
    style?: any
}

interface WrapperProps extends VictoryChartProps {
    height?: number
}

export interface ChartWrapper extends ChartBase {
    kind: ChartKind.wrapper,
    parent: null,
    api?: ApiProps // Currently this SHOULD NOT BE USED. Is here because of stupid Tscript
    props: WrapperProps,
    xAxis: AxisProps,
    yAxis: AxisProps,
    legend?: VictoryLegendProps,
    hidden?: boolean,
    style?: any
}

export type ChartElement = Chart | ChartWrapper | ChartGroup | ChartStack;
