import React from 'react'
import {
    ReducerType,
    FormOption,
    JobExplorerOptions,
    Action
} from '../types';

export const apiOptionsToFormOptions = (
    obj: JobExplorerOptions,
    dispatch: React.Dispatch<Action>
): FormOption[] =>
    Object.keys(obj).map(key => {
        return {
            value: obj[key][0].key,
            setValue: (value) => {
                dispatch({
                    type: ReducerType.setFormOptionValue,
                    payload: { key, value }
                });
            },
            options: obj[key],
            placeholder: key,
            name: key
        } as FormOption;
    });
