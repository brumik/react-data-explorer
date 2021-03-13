import { ChartSchemaElement, ChartSimple, ChartWrapper } from '../../components/Chart/types';

export type State = ChartSchemaElement[];

export enum ReducerTypes {
    set = 'CHARTS_SET',
    reset = 'CHARTS_RESET',
    updateChart = 'CHARTS_UPDATE_CHART',
    deleteElements = 'CHARTS_DELETE_ELEMENTS',
    addWrapperElement = 'CHARTS_ADD_WRAPPER_ELEMENT',
    addChartElement = 'CHARTS_ADD_CHART_ELEMENT',
    updateWrapperHidden = 'CHARTS_UPDATE_WRAPPER_HIDDEN',
    updateWrapper = 'CHARTS_UPDATE_WRAPPER'
}

interface SetAction {
    type: ReducerTypes.set,
    payload: ChartSchemaElement[]
}

interface ResetAction {
    type: ReducerTypes.reset
}

interface UpdateChartAction {
    type: ReducerTypes.updateChart,
    payload: ChartSimple
}

interface DeleteElementsAction {
    type: ReducerTypes.deleteElements,
    ids: number[]
}

interface AddWrapperElementAction {
    type: ReducerTypes.addWrapperElement,
    payload: ChartWrapper
}

interface UpdateWrapperHiddenAction {
    type: ReducerTypes.updateWrapperHidden,
    payload: {
        id: number,
        hidden: boolean
    }
}

interface AddChartElementAction {
    type: ReducerTypes.addChartElement,
    payload: ChartSimple
}

interface UpdateWrapperAction {
    type: ReducerTypes.updateWrapper,
    payload: ChartWrapper
}

export type ActionTypes =
    SetAction |
    ResetAction |
    UpdateChartAction |
    DeleteElementsAction |
    AddWrapperElementAction |
    UpdateWrapperHiddenAction |
    UpdateWrapperAction |
    AddChartElementAction;
