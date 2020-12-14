import {
    ChartElementArray
} from '../../types';

import {
    ReducerTypes,
    ChartActionTypes
} from './types';


// TypeScript infers that this function is returning SendMessageAction
export const setCharts = (charts: ChartElementArray): ChartActionTypes => {
    return {
        type: ReducerTypes.setCharts,
        payload: charts
    };
};

// TypeScript infers that this function is returning DeleteMessageAction
export const resetCharts = (): ChartActionTypes => {
    return {
        type: ReducerTypes.resetCharts
    };
};
