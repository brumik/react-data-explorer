import {
    ChartElement,
    Chart
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

export const reset = (): ActionTypes => ({
    type: ReducerTypes.reset
});
