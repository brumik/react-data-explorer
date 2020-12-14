import { useState, useEffect } from 'react';
import {
    ChartElementArray,
    ChartKind
} from '../types';

interface ReturnType {
    data: ChartElementArray,
    addCharts: (addition: ChartElementArray) => void
    reInitCharts: (addition: ChartElementArray) => void,
    getChartsOfWrapper: (parentId: number) => ChartElementArray
}

const useChartElementStore = (initial: ChartElementArray): ReturnType => {
    const [ data, setData ] = useState([] as ChartElementArray);

    const getLastId = (): number =>
        data.length > 0
            ? Math.max(...data.map(({ id }) => id))
            : 0;

    const getChartsOfWrapper = (parentId: number): ChartElementArray => data.filter(el =>
        el.kind === ChartKind.simple &&
        el.parent === parentId
    );

    const addCharts = (addition: ChartElementArray): void => {
        const lastId = getLastId();

        setData([
            ...data,
            ...addition.map(el => {
                return {
                    ...el,
                    id: el.id + lastId,
                    parent: el.parent == null ? null : el.parent + lastId,
                    children: el.children.map(i => i + lastId)
                };
            })
        ]);
    };

    const reInitCharts = (addition: ChartElementArray): void => {
        setData([ ...addition ]);
    };

    useEffect(() => {
        addCharts(initial);
    }, [])

    return {
        data,
        addCharts,
        reInitCharts,
        getChartsOfWrapper
    };
}

export default useChartElementStore;
