import {
    ChartElement,
    Chart,
    ChartWrapper
} from '../../components/Chart/types';

import {
    ReducerTypes,
    ActionTypes
} from './types';

export const set = (charts: ChartElement[]): ActionTypes => ({
    type: ReducerTypes.set,
    payload: charts
})

export const updateChart = (chart: Chart): ActionTypes => ({
    type: ReducerTypes.updateChart,
    payload: chart
})

export const deleteElements = (ids: number[]): ActionTypes => ({
    type: ReducerTypes.deleteElements,
    ids
})

export const addWrapperElement = (wrapper: ChartWrapper): ActionTypes => ({
    type: ReducerTypes.addWrapperElement,
    wrapper
});

export const reset = (): ActionTypes => ({
    type: ReducerTypes.reset
});
