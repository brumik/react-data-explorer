import { combineReducers } from 'redux';
import chartReducer from './charts/reducers';

export const rootReducer = combineReducers({
    charts: chartReducer
});

export type RootState = ReturnType<typeof rootReducer>
