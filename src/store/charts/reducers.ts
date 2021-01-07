import {
    State,
    ActionTypes,
    ReducerTypes
} from './types';

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
        case ReducerTypes.reset:
            return initialState;
        default:
            return state;
    }
}

export default reducer;
