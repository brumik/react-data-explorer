import {
    ChartState,
    ChartActionTypes,
    ReducerTypes
} from './types';

const initialState: ChartState = {
    charts: []
};

const reducer = (
    state = initialState,
    action: ChartActionTypes
): ChartState => {
    switch (action.type) {
        case ReducerTypes.setCharts:
            return { ...state, charts: action.payload };
        case ReducerTypes.resetCharts:
            return { ...state, charts: [] };
        default:
            return state;
    }
}

export default reducer;
