import {
    ChartElementArray
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

export const resetCharts = (): ChartActionTypes => {
    return {
        type: ReducerTypes.resetCharts
    };
};
