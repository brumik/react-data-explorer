import {
    FormOption
} from '../../components/Form/types';

import {
    ReducerTypes,
    ActionTypes
} from './types';

export const set = (formOptions: FormOption[]): ActionTypes => ({
    type: ReducerTypes.set,
    payload: formOptions
});

export const setOptionValue = (key: number | string, value: string): ActionTypes => ({
    type: ReducerTypes.setOptionValue,
    payload: { key, value }
});

export const reset = (): ActionTypes => ({
    type: ReducerTypes.reset
});
