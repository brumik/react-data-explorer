export enum ChartKind {
    simple,
    group,
    stack,
    wrapper
}

export enum ChartType {
    bar,
    line
}

export interface ChartElement {
    id: number
    kind: ChartKind,
    wrapperId: number, // Id of the parent wrapper Element
    children: number[], // ids of the children
}

export interface Chart extends ChartElement {
    kind: ChartKind.simple,
    data: Record<string, unknown>[],
    type: ChartType,
    // For loading the data from the API
    apiParams?: Record<string, string>[],
    apiEndpoint?: string,
    apiStatus?: {
        loading,
        success,
        error
    }
}

export interface GroupChart extends ChartElement {
    kind: ChartKind.group,
}

export interface StackChart extends ChartElement {
    kind: ChartKind.stack,
}

export interface ChartWrapper extends ChartElement {
    height?: number,
    xAxis?: AxisProps,
    yAxis?: AxisProps
}
