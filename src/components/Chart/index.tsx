import React, { FunctionComponent } from 'react';
import { ChartKind } from './types';
import { useTypedSelector } from '../../store/';
import createChart from './createChart'
import createWrapper from './createWrapper';

const ChartRenderer: FunctionComponent<Record<string, undefined>> = () => {
    const charts = useTypedSelector(store =>
        store.charts.filter(({ parent }) => parent === null));

    const components: Partial<Record<ChartKind, (id: number) => React.ReactElement>> = {
        [ChartKind.wrapper]: createWrapper,
        [ChartKind.simple]: createChart
    };

    return (
        <React.Fragment>
            {charts.map(el => components[el.kind](el.id))}
        </React.Fragment>
    );
}

export default ChartRenderer;
