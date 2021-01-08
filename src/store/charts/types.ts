import {
    ChartElement,
    Chart
} from '../../components/Chart/types';

export type State = ChartElement[];

export enum ReducerTypes {
    set = 'CHARTS_SET',
    reset = 'CHARTS_RESET',
    updateChart = 'CHARTS_UPDATE_CHART'
}

interface SetAction {
    type: ReducerTypes.set,
    payload: ChartElement[]
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
