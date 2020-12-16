import {
    ChartState,
    ChartActionTypes,
    ReducerTypes
} from './types';

const initialState: ChartState = [];

const reducer = (
    state = initialState,
    action: ChartActionTypes
): ChartState => {
    switch (action.type) {
        case ReducerTypes.setCharts:
            return action.payload;
        case ReducerTypes.resetCharts:
            return initialState;
        default:
            return state;
    }
}

export default reducer;
