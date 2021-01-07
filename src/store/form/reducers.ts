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
        case ReducerTypes.reset:
            return [ ...initialState ];
        case ReducerTypes.setOptionValue:
            const { key, value } = action.payload;
            return state.map(item => {
                if (item.name === key) {
                    item.value = value;
                }
                return item;
            });
        default:
            return state;
    }
}

export default reducer;
