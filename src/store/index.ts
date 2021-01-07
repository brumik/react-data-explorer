import { combineReducers } from 'redux';
import chartReducer from './charts/reducers';
import formReducer from './form/reducers';
import { ActionTypes as ChartActionTypes } from './charts/types';
import { ActionTypes as FormActionTypes } from './form/types';

export const rootReducer = combineReducers({
    charts: chartReducer,
    form: formReducer
});

export type RootState = ReturnType<typeof rootReducer>
export type ActionTypes = FormActionTypes | ChartActionTypes;
