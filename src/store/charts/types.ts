import {
    ChartElementArray
} from '../../types';

export interface ChartState {
    charts: ChartElementArray
}

export enum ReducerTypes {
    setCharts,
    resetCharts
}

interface SetChartsAction {
    type: ReducerTypes.setCharts,
    payload: ChartElementArray
}

interface ResetChartsAction {
    type: ReducerTypes.resetCharts
}

export type ChartActionTypes = SetChartsAction | ResetChartsAction;
