import { useReducer } from 'react';
import {
    ReducerType,
    Action,
    FormOption
} from '../types';

const initial = [] as FormOption[];

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

const reducer = (state: FormOption[], { type, payload }: Action) => {
    switch (type) {
        case ReducerType.setForm:
            return payload as FormOption[];
        case ReducerType.setFormOptionValue:
            return setFormOptionValue(state, payload);
        case ReducerType.reset:
            return [...initial];
        default:
            return state;
    }
};

type CustomReducerType = () => [ FormOption[], React.Dispatch<Action> ];

const useDataReducer: CustomReducerType = () => useReducer(reducer, [...initial]);

export default useDataReducer;
