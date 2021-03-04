import { ChartType } from '../Chart/types';

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
