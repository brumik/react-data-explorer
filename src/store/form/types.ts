import {
    FormOption
} from '../../components/Form/types';

export type State = FormOption[];

export enum ReducerTypes {
    set = 'FORM_SET',
    reset = 'FORM_RESET',
    setOptionValue = 'FORM_SET_OPTION_VALUE'
}

interface SetAction {
    type: ReducerTypes.set,
    payload: FormOption[]
}

interface ResetAction {
    type: ReducerTypes.reset
}

interface SetOptionValueAction {
    type: ReducerTypes.setOptionValue
    payload: {
        key: string | number
        value: string
    }
}

export type ActionTypes =
    SetAction |
    ResetAction |
    SetOptionValueAction
