import {
    ChartElementArray,
    Chart
} from '../../types';

export type ChartState = ChartElementArray;

export enum ReducerTypes {
    setCharts,
    resetCharts,
    updateChart
}

interface SetChartsAction {
    type: ReducerTypes.setCharts,
    payload: ChartElementArray
}

interface ResetChartsAction {
    type: ReducerTypes.resetCharts
}

interface UpdateChartAction {
    type: ReducerTypes.updateChart,
    payload: Chart
}

export type ChartActionTypes =
    SetChartsAction |
    ResetChartsAction |
    UpdateChartAction;
