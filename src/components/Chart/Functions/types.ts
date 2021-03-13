import { SyntheticEvent } from 'react';

export type ChartOnClickFunction = (event: SyntheticEvent<any, Event>, props: Record<string, any>) => any;
export type ChartAxisFormatFunction = (tick: string | number) => string;

export interface ChartFunctions {
    onClick?: Record<string, ChartOnClickFunction>
    axisFormat?: Record<string, ChartAxisFormatFunction>
}
