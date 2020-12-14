import { useReducer } from 'react';
import {
    ReducerType,
    State,
    Action,
    FormOption,
    ChartElementArray
} from '../types';

const initial = {
    charts: [] as ChartElementArray,
    form: [] as FormOption[]
};

const setFormOptionValue = (
    form: FormOption[],
    { key, value }: { key: string, value: string }
): FormOption[] =>
    form.map(item => {
        if (item.name === key) {
            item.value = value;
        }
        return item;
    });

const reducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case ReducerType.set:
            return ({ ...payload } as State);
        case ReducerType.setForm:
            return { ...state, form: payload as FormOption[] };
        case ReducerType.setFormOptionValue:
            /* Update the chart value */
            // TODO

            return { ...state, form: setFormOptionValue(state.form, payload) };
        case ReducerType.reset:
            return { ...initial };
        case ReducerType.setCharts:
            return { ...state, charts: payload as ChartElementArray }
        default:
            return state;
    }
};

type CustomReducerType = () => [ State, React.Dispatch<Action> ];

const useDataReducer: CustomReducerType = () => useReducer(reducer, { ...initial });

export default useDataReducer;
