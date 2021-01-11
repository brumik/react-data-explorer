import {
    ChartElement,
    Chart,
    ChartWrapper
} from '../../components/Chart/types';

export type State = ChartElement[];

export enum ReducerTypes {
    set = 'CHARTS_SET',
    reset = 'CHARTS_RESET',
    updateChart = 'CHARTS_UPDATE_CHART',
    deleteElements = 'CHARTS_DELETE_ELEMENTS',
    addWrapperElement = 'CHARTS_ADD_WRAPPER_ELEMENT'
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

interface DeleteElementsAction {
    type: ReducerTypes.deleteElements,
    ids: number[]
}

interface AddWrapperElementAction {
    type: ReducerTypes.addWrapperElement,
    wrapper: ChartWrapper
}

export type ActionTypes =
    SetAction |
    ResetAction |
    UpdateChartAction |
    DeleteElementsAction |
    AddWrapperElementAction;
