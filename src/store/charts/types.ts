import {
    ChartElementArray
} from '../../types';

export type ChartState = ChartElementArray;

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
