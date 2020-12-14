import React from 'react'
import {
    ChartElementArray
} from '../types';

const ChartElementsContext = React.createContext([] as ChartElementArray)
export const ChartElementsProvider = ChartElementsContext.Provider
export default ChartElementsContext;
