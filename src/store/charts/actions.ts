import {
    ChartElementArray,
    Chart
} from '../../types';

import {
    ReducerTypes,
    ChartActionTypes
} from './types';


export const setCharts = (charts: ChartElementArray): ChartActionTypes => {
    return {
        type: ReducerTypes.setCharts,
        payload: charts
    };
};

export const updateChart = (payload: Chart): ChartActionTypes => {
    return {
        type: ReducerTypes.updateChart,
        payload
    }
}

export const resetCharts = (): ChartActionTypes => {
    return {
        type: ReducerTypes.resetCharts
    };
};
