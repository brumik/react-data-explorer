export enum ReducerType {
    reset = 'reset',
    set = 'set',
    setForm = 'setForm',
    setFormOptionValue = 'setFormOptionValue'
}

export enum ChartType {
    bar = 'bar'
}

export type Action =
 | { type: ReducerType.reset, payload: any }
 | { type: ReducerType.set, payload: State }
 | { type: ReducerType.setForm, payload: FormOption[] }
 | { type: ReducerType.setFormOptionValue, payload: { key: string | number, value: string } };


export interface ChartOptions {
    chartType?: ChartType,
    x?: string,
    y?: string,
}

export interface ChartState {
    name: string,
    position: string,
    apiParams: Record<string, string>[],
    chartParams: ChartOptions
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
    setValue: SetterFunc<string>,
    options: SelectOptionProps[],
    placeholder: string,
    name: string
}

export interface State {
    charts: ChartState[]
    form: FormOption[]
}
