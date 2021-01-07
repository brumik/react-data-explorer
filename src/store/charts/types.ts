import {
    ChartElementArray,
    Chart
} from '../../types';

export type State = ChartElementArray;

export enum ReducerTypes {
    set = 'CHARTS_SET',
    reset = 'CHARTS_RESET',
    updateChart = 'CHARTS_UPDATE_CHART'
}

interface SetAction {
    type: ReducerTypes.set,
    payload: ChartElementArray
}

interface ResetAction {
    type: ReducerTypes.reset
}

interface UpdateChartAction {
    type: ReducerTypes.updateChart,
    payload: Chart
}

export type ActionTypes =
    SetAction |
    ResetAction |
    UpdateChartAction;
