import {
    State,
    ActionTypes,
    ReducerTypes
} from './types';

import {
    ChartElement
} from '../../components/Chart/types';

const nextId = (state: State): number =>
    Math.max(...state.map((el: ChartElement) => el.id)) + 1;

const initialState: State = [];
const reducer = (
    state = initialState,
    action: ActionTypes
): State => {
    switch (action.type) {
        case ReducerTypes.set:
            return action.payload;
        case ReducerTypes.updateChart:
            return [
                ...state.filter(({ id }) => id !== action.payload.id),
                { ...action.payload }
            ];
        case ReducerTypes.deleteElements:
            return state.filter(({ id }) => !action.ids.includes(id));
        case ReducerTypes.addWrapperElement:
            return [ ...state, {
                ...action.wrapper,
                id: nextId(state)
            } ];
        case ReducerTypes.reset:
            return initialState;
        default:
            return state;
    }
}

export default reducer;
