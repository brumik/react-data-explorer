import {
    State,
    ActionTypes,
    ReducerTypes
} from './types';

import { ChartSchemaElement, ChartWrapper } from '../../components/Chart/types';

const nextId = (state: State): number =>
    Math.max(...state.map((el: ChartSchemaElement) => el.id)) + 1;

const initialState: State = [];
const reducer = (
    state = initialState,
    action: ActionTypes
): State => {
    switch (action.type) {
        case ReducerTypes.set:
            return action.payload;
        case ReducerTypes.updateWrapper:
        case ReducerTypes.updateChart:
            return [
                ...state.filter(({ id }) => id !== action.payload.id),
                { ...action.payload }
            ];
        case ReducerTypes.deleteElements:
            return state.filter(({ id }) => !action.ids.includes(id));
        case ReducerTypes.addChartElement:
        case ReducerTypes.addWrapperElement:
            return [ ...state, {
                ...action.payload,
                id: nextId(state)
            } ];
        case ReducerTypes.updateWrapperHidden:
            const wrapper = state.find(({ id }) =>
                id === action.payload.id) as ChartWrapper;
            return [
                ...state.filter(({ id }) => id !== action.payload.id),
                {...wrapper}
            ]
        case ReducerTypes.reset:
            return initialState;
        default:
            return state;
    }
}

export default reducer;
