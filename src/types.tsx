export enum ReducerType {
    reset = 'reset',
    setForm = 'setForm',
    setFormOptionValue = 'setFormOptionValue'
}

export enum ChartKind {
    simple,
    group,
    stack,
    wrapper
}

export enum ChartType {
    bar = 'bar',
    line = 'line'
}

export enum APIStatus {
    loading,
    success,
    error
}

export type Action =
 | { type: ReducerType.reset, payload: any }
 | { type: ReducerType.setForm, payload: FormOption[] }
 | { type: ReducerType.setFormOptionValue, payload: { key: string | number, value: string } };

export interface EndpointProps {
    url: string,
    optionUrl: string
    name: string
}

export interface AxisProps {
    label?: string,
    tickFormat?: (value: string | number) => string | number,
    fixLabelOverlap?: boolean,
    domain?: any,
    style?: any
}

export interface ChartElement {
    id: number
    kind: ChartKind,
    parent: number, // Id of the parent wrapper Element
    children: number[], // ids of the children
}

export interface Chart extends ChartElement {
    kind: ChartKind.simple,
    data: Record<string, unknown>[],
    type: ChartType,
    x?: string,
    y?: string,
    // For loading the data from the API
    apiParams: Record<string, string>[],
    apiEndpoint: Promise<unknown>
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
    yAxis?: AxisProps,
    status?: APIStatus
}

export type SetterFunc<T> = (v: T) => void;

export interface SelectOptionProps {
    key: string | number,
    value: string,
    description?: string
}

export type JobExplorerOptions = Record<string, {
    [index: number]: SelectOptionProps
}>;

export interface FormOption {
    value: string,
    setValue: SetterFunc<string | ChartType>,
    options: SelectOptionProps[],
    placeholder: string,
    name: string
}

export type ChartElementArray = (Chart | ChartWrapper)[];
