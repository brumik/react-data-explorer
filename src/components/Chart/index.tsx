import React, { FunctionComponent } from 'react';
import VChartWrapper from './VChartWrapper';
import { ChartWrapper } from './types';
import { useTypedSelector } from '../../store/';

const ChartRenderer: FunctionComponent<Record<string, undefined>> = () => {
    const charts = useTypedSelector(store =>
        store.charts.filter(({ parent }) => parent === null) as ChartWrapper[]);

    return (
        <React.Fragment>
            {charts.map(wrapper => (<VChartWrapper key={wrapper.id} {...wrapper} />))}
        </React.Fragment>
    );
}

export default ChartRenderer;
